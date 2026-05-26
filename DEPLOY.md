# 모바일 업무 포털 — 배포 가이드

> **배포 대상 파일**: `index.html` 단일 파일  
> **외부 의존성**: 없음 (CDN, npm 패키지 불필요)  
> **필수 조건**: HTTPS 제공 가능한 웹 서버

---

## ✅ 배포 전 체크리스트

### 1. URL 교체 (필수)
`index.html` 상단 `APP_DATA` 배열에서 각 항목의 `url` 값을 실제 SharePoint 주소로 교체합니다.

```js
const APP_DATA = [
  { title: '안전보건', url: 'https://gsenc.sharepoint.com/sites/xicnasafety/' },
  { title: '공무',    url: 'https://gsenc.sharepoint.com/sites/projectcontrol/?poolIdx=1' },
  { title: 'BIM Portal', url: 'https://gsenc.sharepoint.com/sites/SmartCon/' },
  { title: 'DX Portal',  url: 'https://gsenc.sharepoint.com/sites/xicnadx' },
];
```

### 2. HTTPS 필수
SharePoint SSO(Microsoft 계정 로그인)는 HTTPS 환경에서만 정상 작동합니다.  
HTTP로 접속 시 로그인 리디렉션이 차단될 수 있습니다.

### 3. 브라우저 테스트
| 환경 | 확인 항목 |
|------|----------|
| Android WebView | 카드 탭 → SharePoint 이동 확인 |
| iOS WKWebView   | 카드 탭 → SharePoint 이동 확인 |
| 모바일 Safari   | 화면 레이아웃 (375px) 확인 |
| 모바일 Chrome   | 화면 레이아웃 확인 |
| iPad Safari     | 태블릿 레이아웃 (768px, 1024px) 확인 |

---

## 🚀 배포 옵션

### 옵션 A — IIS (Windows 내부 서버) ★ 권장

1. IIS 관리자에서 새 웹 사이트 또는 가상 디렉터리 생성
2. 실제 경로에 `index.html` 복사
3. HTTPS 바인딩 설정 (인증서 적용)
4. MIME 타입 확인: `.html` → `text/html; charset=utf-8`

**권장 HTTP 응답 헤더 (IIS web.config)**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <!-- 클릭재킹 방지 -->
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <!-- XSS 필터 -->
        <add name="X-XSS-Protection" value="1; mode=block" />
        <!-- MIME 스니핑 방지 -->
        <add name="X-Content-Type-Options" value="nosniff" />
        <!-- HTTPS 강제 (1년) -->
        <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
        <!-- 콘텐츠 보안 정책 -->
        <add name="Content-Security-Policy"
             value="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:;" />
        <!-- 리퍼러 제한 -->
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
      </customHeaders>
    </httpProtocol>
    <staticContent>
      <mimeMap fileExtension=".html" mimeType="text/html; charset=utf-8" />
    </staticContent>
  </system.webServer>
</configuration>
```

---

### 옵션 B — Nginx

```nginx
server {
    listen 443 ssl;
    server_name portal.your-domain.com;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/portal;
    index index.html;

    # 보안 헤더
    add_header X-Frame-Options          "SAMEORIGIN";
    add_header X-Content-Type-Options   "nosniff";
    add_header X-XSS-Protection         "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header Content-Security-Policy  "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:;";
    add_header Referrer-Policy          "strict-origin-when-cross-origin";

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# HTTP → HTTPS 리디렉션
server {
    listen 80;
    server_name portal.your-domain.com;
    return 301 https://$host$request_uri;
}
```

---

### 옵션 C — 모바일 앱 내 번들 (로컬 파일)

앱 빌드 시 `index.html`을 앱 에셋으로 포함하고 WebView에서 로컬 파일로 로드하는 방식입니다.

**Android (WebView 설정 예시)**:
```kotlin
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    // SharePoint SSO를 위한 쿠키 허용
    setSupportMultipleWindows(true)
}
// 외부 URL(SharePoint)은 시스템 브라우저로 열기
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
        return if (url.contains("sharepoint.com") || url.contains("microsoftonline.com")) {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
            true
        } else false
    }
}
webView.loadUrl("file:///android_asset/index.html")
```

**iOS (WKWebView 설정 예시)**:
```swift
let config = WKWebViewConfiguration()
config.preferences.javaScriptEnabled = true

// SharePoint URL은 Safari로 열기
func webView(_ webView: WKWebView,
             decidePolicyFor action: WKNavigationAction,
             decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    if let url = action.request.url,
       url.host?.contains("sharepoint.com") == true ||
       url.host?.contains("microsoftonline.com") == true {
        UIApplication.shared.open(url)
        decisionHandler(.cancel)
        return
    }
    decisionHandler(.allow)
}
```

> **⚠️ 주의**: `window.location.href` 로 SharePoint로 이동하면 WebView 내에서  
> Microsoft SSO 로그인 흐름이 진행됩니다. SSO가 WebView에서 처리되지 않으면  
> `index.html` 상단 `openUrl()` 함수에서 **방법 B** (window.open)로 전환하거나,  
> 위 앱 코드처럼 외부 브라우저로 위임하는 방식을 사용하세요.

---

### 옵션 D — SharePoint 사이트 내 삽입

SharePoint 페이지에 직접 포함할 경우, 콘텐츠 에디터 웹파트 또는  
SPFx(SharePoint Framework) 웹파트로 변환하는 작업이 필요합니다.  
(이 경우 별도 협의 필요)

---

## 🔒 SharePoint SSO 흐름

```
사용자가 카드 탭
    ↓
window.location.href = "https://gsenc.sharepoint.com/..."
    ↓
Microsoft 로그인 페이지 (미로그인 시) 또는 SharePoint 직접 이동 (SSO 세션 있을 시)
    ↓
SharePoint 사이트 표시
    ↓
← 뒤로가기 → 모바일 업무 포털 복귀
```

사내 네트워크 또는 Azure AD 조건부 액세스 정책이 적용된 환경에서는  
회사 계정으로 한 번 로그인하면 이후에는 SSO로 자동 처리됩니다.

---

## 📁 배포 파일 구조

```
/portal/
  ├── index.html          ← 메인 파일 (전부)
  └── icons/              ← 선택사항: 커스텀 아이콘 이미지 교체 시
        ├── safety.png
        ├── project.png
        ├── bim.png
        └── dx.png
```

> `icons/` 폴더는 SVG 아이콘 대신 이미지 파일을 사용할 때만 필요합니다.  
> `index.html`의 각 항목에서 `iconType: "image"`, `iconSrc: "./icons/파일명.png"` 로 변경하세요.

---

## 🧪 배포 후 검증

```
□ HTTPS 접속 확인 (주소창 자물쇠 아이콘)
□ 4개 카드 정상 표시 확인
□ 각 카드 탭 → SharePoint 이동 확인
□ SharePoint 로그인 정상 처리 확인
□ 뒤로가기 → 포털 복귀 확인
□ 모바일(375px) 레이아웃 확인
□ 태블릿(768px, 1024px) 레이아웃 확인
□ 브라우저 개발자 도구 → Console 오류 없음 확인
□ 브라우저 개발자 도구 → Network → favicon.ico 404 없음 확인
```
