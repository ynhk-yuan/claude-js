const user = {
    name: "김유안",
    age: 20,
    hobby: "코딩",
    address: "서울시 서초구"
}

// 닷(.) 접근법()
console.log(user.name)

//대괄호 접근법
console.log(user["age"])

// 값이 있으면 수정, 없으면 추가

user.name = "김유안"
console.log(user)