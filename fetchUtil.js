/**
 * fetchUtil.js
 * ES6 fetch + async/await 기반의 재사용 가능한 HTTP 요청 유틸리티
 */

// [설명] 모든 요청에 공통으로 적용되는 기본 설정값 (JSON 통신, 타임아웃 5초)
const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
};

/**
 * [설명] 공통 요청 함수 (모든 HTTP 메서드의 기반)
 * @param {string} url      - 요청 주소
 * @param {object} options  - method, body, headers, timeout 등 fetch 옵션
 * @returns {Promise<any>}  - 파싱된 응답 데이터
 */
export const request = async (url, options = {}) => {
  // [설명] 기본 옵션과 사용자 옵션 병합 (headers도 개별 병합)
  const { timeout, headers, body, ...rest } = { ...DEFAULT_OPTIONS, ...options };

  // [설명] AbortController: 지정 시간 초과 시 요청을 취소하기 위해 사용
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    // [설명] fetch 호출, await로 응답이 올 때까지 대기
    const response = await fetch(url, {
      ...rest,
      headers: { ...DEFAULT_OPTIONS.headers, ...options.headers },
      // [설명] body가 객체이면 JSON 문자열로 변환
      body: body && typeof body === 'object' ? JSON.stringify(body) : body,
      signal: controller.signal,
    });

    // [설명] fetch는 404/500에서도 reject하지 않으므로 response.ok를 직접 검사
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    // [설명] 응답이 JSON이면 json(), 아니면 text()로 파싱 (204 No Content 대응)
    const contentType = response.headers.get('content-type') || '';
    if (response.status === 204) return null;
    return contentType.includes('application/json')
      ? await response.json()
      : await response.text();
  } catch (error) {
    // [설명] 타임아웃으로 취소된 경우와 일반 오류를 구분하여 메시지 처리
    if (error.name === 'AbortError') {
      throw new Error(`요청 시간 초과 (${timeout}ms): ${url}`);
    }
    throw error;
  } finally {
    // [설명] 성공/실패와 관계없이 타이머 정리
    clearTimeout(timer);
  }
};

// [설명] HTTP 메서드별 래퍼 함수 - request를 재사용하여 간결하게 호출
export const get = (url, options) => request(url, { ...options, method: 'GET' });
export const post = (url, body, options) => request(url, { ...options, method: 'POST', body });
export const put = (url, body, options) => request(url, { ...options, method: 'PUT', body });
export const patch = (url, body, options) => request(url, { ...options, method: 'PATCH', body });
export const del = (url, options) => request(url, { ...options, method: 'DELETE' });

/* ------------------------------------------------------------------
 * [사용 예시] (Node 18+ 또는 브라우저, ES Module 환경)
 * ------------------------------------------------------------------ */
// [설명] 이 파일을 직접 실행했을 때만 데모 동작 (node fetchUtil.js)
const isMain = typeof process !== 'undefined' && import.meta.url === `file:///${process.argv[1]?.replace(/\\/g, '/')}`;

if (isMain) {
  (async () => {
    try {
      // GET: 게시글 1건 조회
      const post1 = await get('https://jsonplaceholder.typicode.com/posts/1');
      console.log('GET  :', post1.title);

      // POST: 게시글 생성
      const created = await post('https://jsonplaceholder.typicode.com/posts', {
        title: 'hello', body: 'fetch', userId: 1,
      });
      console.log('POST :', created);
    } catch (e) {
      console.error('요청 실패:', e.message);
    }
  })();
}
