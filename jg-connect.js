/* jg-connect.js - JG 통합 AI 연결 소스: JG법령검색 (jg-lawsearch, 홈페이지)
 * Gateway 관리자 화면의 '연결소스'에서 만든 파일입니다.
 * - 외부 API 키·비밀번호·토큰은 이 파일에 없습니다. 외부 키는 Gateway(Mac mini)만 가지고 있습니다.
 * - 이 파일보다 먼저 tae-ai-client.js (v1.2 이상)를 불러오세요: https://api.jg.it.kr/sdk/tae-ai-client.js
 * - 관리자 화면에 등록한 이 앱의 허용 Origin(https:law.jg.it.kr)에서만 동작합니다.
 * - 선택한 기능: 회원제 로그인, AI 질문, 외부 API(law-search)
 */
(function (root) {
  "use strict";
  const API_BASE = "https://api.jg.it.kr";
  const APP_ID = "jg-lawsearch";
  const ai = new TaeAI({ apiBase: API_BASE, appId: APP_ID });   // 만들기만 해서는 서버에 요청하지 않습니다
  const JG = { ai };
  const need = async () => { if (!ai.isLoggedIn()) await ai.requireLogin(); };   // 로그인 창을 띄우고 완료를 기다림

  /* 로그인 */
  JG.login = () => ai.requireLogin();        // 로그인·회원가입 창. 이미 로그인되어 있으면 바로 끝납니다
  JG.logout = () => ai.logout();
  JG.isLoggedIn = () => ai.isLoggedIn();

  /* 연결 확인: 이 앱이 쓸 수 있는 기능을 Gateway에 묻습니다 (AI를 쓰지 않으므로 사용량이 늘지 않습니다).
     사용 권한이 없으면 TaeAIError(APP_PERMISSION_DENIED)가 납니다. */
  JG.info = async () => { await need(); return ai.appInfo(); };

  /* AI 질문 */
  JG.ask = (q, opt) => ai.ask(q, opt);                          // 답변 전체
  JG.askStream = (q, onDelta, opt) => ai.askStream(q, onDelta, opt);   // onDelta(조각, 누적)
  /* 근거 자료 첨부 질문: sources=[{title, text}] → 그 원문만 근거로 [1]처럼 번호를 붙여 답함 */
  JG.askWithSources = (q, sources, onDelta, opt) => ai.askWithSources(q, sources, onDelta, opt);

  /* 외부 API (키는 필요 없습니다. Gateway가 대신 호출합니다) */
  JG.ext = {};
  JG.ext["law-search"] = async (params) => {          // 법령 실시간 검색 (법제처)
    // query(필수): 문자
    // target(필수): law | prec | expc | admrul | ordin
    // display(선택): 정수
    // page(선택): 정수
    await need();
    const r = await ai.ext("law-search", params || {});
    if (r.status !== 200) throw new Error("외부 서비스 응답 오류 (" + r.status + ")");
    return r.data;
  };

  root.JG = JG;
})(typeof window !== "undefined" ? window : globalThis);
