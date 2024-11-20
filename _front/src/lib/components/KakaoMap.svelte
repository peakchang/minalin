<script>
    import { onMount, tick } from "svelte";
    import { browser } from "$app/environment";
    let kakao;
    let mapScript;

    let kakaomapArea;

    export let getAddress = "";
    export let phText = "minal in";

    // let getAddress: string = "경기도 수원시 장안구 수원북부순환로 266 (조원동) ";
    // let phText: string = "작업1111";

    onMount(async () => {
        if (browser) {
            console.log(window.kakao);
            
            kakao = window.kakao;
            console.log(kakao);
        }

        console.log(getAddress);
        console.log(phText);
        createMap();
    });

    async function createMap() {
        console.log("맵 함수는 들어옴?!");
        console.log(kakao);
        console.log("에러 안남??");

        kakao.maps.load(() => {
            console.log("카카오 맵 불러와졌어?!?!?!");

            var options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            console.log(options);

            var map = new kakao.maps.Map(kakaomapArea, options);
            console.log(map);

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            console.log(geocoder);
            

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(
                getAddress,
                function (result, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(
                            result[0].y,
                            result[0].x
                        );

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content:
                                '<div style="width:150px;text-align:center;padding:3px 0; border-radius:10px;">' +
                                phText +
                                "</div>",
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                }
            );
        });
    }
</script>

<svelte:head>
    <script
        type="text/javascript"
        defer
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=36aa75a1c58848caeb4edc00f6e9535d&libraries=services&autoload=false`}
    ></script>
</svelte:head>
<div id="map" style="width:100%; height:400px;" bind:this={kakaomapArea} />