/* 위도경도 거리계산 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; //Km 단위
    return d;
}

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

Number.prototype.toDegree = function () {
    //Km 단위를 Degree로 변환
    //1 Degree = 111 Km
    return this * 0.00900900900900901;
}

