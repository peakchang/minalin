<script>
    import FullCalendar from "svelte-fullcalendar";
    import interactionPlugin from "@fullcalendar/interaction"; // 플러그인 가져오기
    import daygridPlugin from "@fullcalendar/daygrid";

    // import ko from '@fullcalendar/core/locales/ko';
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let startTime = $state("00:00");
    let endTime = $state("00:00");
    let addSchedule = $state(true);

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
            schedule_modal.showModal();
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

    $effect(() => {
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

<dialog id="schedule_modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-5">
                <span class="text-lg">일정 추가</span>
                <button
                    class="border-2 border-black rounded-md px-2 py-1"
                    on:click={() => {
                        addSchedule = !addSchedule;
                    }}
                >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
            <div>
                <form method="dialog">
                    <button class="rounded-md text-2xl">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </div>
        <div class="mt-3">
            <table class="w-full">
                <thead class="text-xs md:text-xs">
                    <tr>
                        <th class="in-th"> 날짜 </th>
                        <th class="in-th"> 시작시간 </th>
                        <th class="in-th"> 종료시간 </th>
                        <th class="in-th"> 예약자명 </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class:hidden={addSchedule}>
                        <td class="in-td">
                            <input
                                type="date"
                                class="border w-full px-1 py-2 rounded-md text-xs"
                            />
                        </td>
                        <td class="in-td">
                            <select
                                id="hours"
                                class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                bind:value={startTime}
                            >
                                {#each Array(24)
                                    .fill(0)
                                    .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                    <option value={hour}>{hour}:00</option>
                                {/each}
                            </select>
                        </td>
                        <td class="in-td">
                            <select
                                id="hours"
                                class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                bind:value={endTime}
                            >
                                {#each Array(24)
                                    .fill(0)
                                    .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                    <option value={hour}>{hour}:00</option>
                                {/each}
                            </select>
                        </td>
                        <td class="in-td">
                            <input
                                type="text"
                                class="input-base text-xs"
                                placeholder="성함을 입력하세요"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-3">
            <form method="dialog">
                <button type="button">gogogo</button>
                <button>닫기</button>
            </form>
        </div>
    </div>
</dialog>
<!-- <svelte:window on:load={() => console.log('DOM loaded')}> -->

<div class="max-w-[1200px] mx-auto px-2">
    <div class="text-center text-lg font-semibold">예약 관리</div>
    <div class="text-center text-xs">
        ※ 예약 일정 수정시 달력 내 빈곳(하얀색)을 클릭해야함!!
    </div>

    <div class="text-xs md:text-sm">
        <FullCalendar {options} />
    </div>

    <div class="text-sm">dsfsdf</div>
</div>
