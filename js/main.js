let latitude,
    longitude = "";
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
    alert("brauzeriniz yer məlumatını ala bilmir");
}
function onSuccess(position) {
    let latitude =(position.coords.latitude);
    let longitude =(position.coords.longitude);

    let api_key = "017f7ca0c4304f4fb5fd5e137e697233"
    let api_url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`
    
    fetch(api_url)
       .then(response => response.json())
       .then(result => {
        let details = result.results[0].components;
        let {country, city, road, continent, postcode, province} = details;
        document.querySelector('#results').innerHTML = `
        <p>Qitə: ${continent}</p>
        <p>Ölkə: ${country}</p>
        <p>Şəhər: ${city}</p>
        <p>Küçə: ${road}</p>
        <p>Post kodu: ${postcode}</p>
        `
       });

}
function onError(error) {
    if (error.code == 1) {
        alert("Istifadəçi icazə istəyini rədd etdi");
    } else if (error.code == 1) {
        alert("Yer məlumatınız alına bilmədi");
    } else {
        alert("Xəta baş verdi");
    }
}


