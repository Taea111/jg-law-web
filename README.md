# JG법령검색 웹판 (law.jg.it.kr)

국가법령정보센터 OPEN API 자료를 검색하는 웹 페이지입니다. 설치 없이 브라우저에서 열립니다.

- **주소**: https://law.jg.it.kr (이 저장소의 GitHub Pages, CNAME)
- **누구나**: 법령·판례·해석례·재결례·행정규칙·자치법규 검색, 조문 보기, 「법령명」 창, 법령 연계도, 법령 비교, 즐겨찾기
- **회원(JG 로그인)**: 🤖 AI 질문 — JG Gateway(api.jg.it.kr) 연결, `jg-connect.js`(키 없음). law.jg.it.kr에서만 켜집니다.

## 법령 자료 (data/)
JG중앙통제가 매주 국가법령정보센터 API로 법령을 업데이트하고 `data/`를 이 저장소에 올립니다.
페이지는 GitHub에서 `data/index.png`를 바꾼 커밋 목록을 읽어 "최근 법령 업데이트"와 바뀐 법령(개정·새 법령·폐지)을
보여 줍니다. 저장소에 따로 쓰는 것은 없습니다.

## AI 사용 시간 (ai-hours.json)
JG중앙통제의 AI 사용 시간을 페이지에 보여 줍니다. Gateway가 appInfo로 시간을 알려 주면 그것을, 아니면 이 파일을 씁니다.
시간을 바꾸면 이 파일도 같이 바꿔 올리세요(요일 0=일 … 6=토, 한국 시간):

    {"days": [1, 2, 3, 4, 5], "from": "08:00", "to": "19:00", "tz": "Asia/Seoul"}

## 페이지 (index.html)
JG법령검색 저장소(Taea111/-)의 `jg_law_search/artifact/index.html`을 공개용으로 감싼 것입니다
(`tools/pages_sync.py page <이 저장소>` — `data/`는 건드리지 않음).
