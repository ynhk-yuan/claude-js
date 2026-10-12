// ============================================
// 학생의 평균점수를 계산하여 합격/불합격 판정
// ============================================

// 변수에 값 저장
// 학생의 이름을 저장하는 변수
const name = "김철수";
// 국어점수를 저장하는 변수
const koreanScore = 75;
// 수학점수를 저장하는 변수
const mathScore = 85;
// 영어점수를 저장하는 변수
const englishScore = 65;

// 평균 계산
// 세 과목의 점수를 모두 더해서 3으로 나누어 평균 계산
const average = (koreanScore + mathScore + englishScore) / 3;

// if 문으로 합격/불합격 판정
// 평균이 60점 이상이면 합격, 60점 미만이면 불합격
if (average >= 60) {
  // 합격인 경우: 학생이름, 평균점수, "합격" 출력
  // toFixed(2)는 소수점 아래 2자리까지만 표시
  console.log(`${name}의 평균: ${average.toFixed(2)}점 - 합격`);
} else {
  // 불합격인 경우: 학생이름, 평균점수, "불합격" 출력
  console.log(`${name}의 평균: ${average.toFixed(2)}점 - 불합격`);
}
