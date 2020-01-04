export function G_SerializeQRList(aQRList) {
    s = ""
    for (var i = 0; i < aQRList.length; i++) {
        s = s + " " + aQRList[i].state;
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
