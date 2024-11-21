<script>
    import FullCalendar from "svelte-fullcalendar";
    import interactionPlugin from "@fullcalendar/interaction"; // 플러그인 가져오기
    import daygridPlugin from "@fullcalendar/daygrid";

    // import ko from '@fullcalendar/core/locales/ko';
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let monthEvent = $state([
        { title: `09:00~12:00 김예지님`, date: "2024-11-30" },
        { title: `13:00~17:00 강다연님`, date: "2024-11-30" },
        { title: `19:00~ 오연주님`, date: "2024-11-30" },
        { title: "23:00~ 김승이님", date: "2024-11-08" },
        { title: "18:00~23:00 김미영님", date: "2024-11-15" },
    ]);
    let options = {
        dateClick: function (info) {
            console.log(info);
        },
        events: monthEvent,
        initialView: "dayGridMonth",
        plugins: [daygridPlugin, interactionPlugin],
        locale: "ko",
        datesSet: function (info) {
            console.log("뷰 변경 또는 날짜 범위 업데이트");
            console.log("현재 뷰:", info.view.type); // 예: "dayGridMonth"
            console.log("시작 날짜:", info.startStr); // 현재 뷰의 시작 날짜
            console.log("끝 날짜:", info.endStr); // 현재 뷰의 끝 날짜
        },
    };

    onMount(() => {
        if (browser) {
            const eventWrappers = document.querySelectorAll(".fc-sticky");

            eventWrappers.forEach((wrapper) => {
                // 엘리먼트 내의 텍스트를 가져옵니다.
                const textContent = wrapper.textContent.trim();

                // 텍스트를 공란 기준으로 나눕니다.
                const textArray = textContent.split(/\s+/);

                // 배열의 길이가 2 이상인지 확인합니다.
                if (textArray.length >= 2) {
                    // 상위 엘리먼트를 가져옵니다.
                    const parent = wrapper.parentElement;

                    // 기존 엘리먼트를 제거합니다.
                    parent.removeChild(wrapper);

                    parent.style.textAlign = "center";

                    // 첫 번째와 두 번째 텍스트를 사용하여 새로운 엘리먼트를 생성합니다.
                    const newWrapper1 = document.createElement("div");
                    const newWrapper2 = document.createElement("div");

                    // 각각의 새로운 엘리먼트에 텍스트를 추가합니다.
                    newWrapper1.textContent = textArray[0];
                    newWrapper2.textContent = textArray[1];

                    // 원한다면 클래스 추가
                    newWrapper1.classList.add("fc-sticky");
                    newWrapper2.classList.add("fc-sticky");

                    // 상위 엘리먼트에 새로운 엘리먼트들을 추가합니다.
                    parent.appendChild(newWrapper1);
                    parent.appendChild(newWrapper2);
                }
            });
        }
    });
</script>



<div class="max-w-[1000px] mx-auto px-2 pt-28">
    
    <div class="text-center text-lg font-semibold">예약현황 페이지</div>

    <div class="text-xs md:text-sm">
        <FullCalendar {options} />
    </div>

    <div class="text-sm">dsfsdf</div>
</div>
