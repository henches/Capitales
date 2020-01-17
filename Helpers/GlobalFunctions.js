export function G_SerializeQueResList(aQueResList) {
    s = ""
    for (var i = 0; i < aQueResList.length; i++) {
        s = s + " " + aQueResList[i].state;
    }
    return s
}

export function G_SerializeGivenAnswerList(list) {
    s = ""
    for (var i = 0; i < list.length; i++) {
        s = s + "  " + list[i].id + '-' + list[i].rightAnswer.state + '-' + list
[i].givenAnswer.state;
    }
    return s
}
