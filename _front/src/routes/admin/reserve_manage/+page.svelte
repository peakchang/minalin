<script>
    import FullCalendar from "svelte-fullcalendar";
    import interactionPlugin from "@fullcalendar/interaction"; // 플러그인 가져오기
    import daygridPlugin from "@fullcalendar/daygrid";

    // import ko from '@fullcalendar/core/locales/ko';
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import moment from "moment";
    import axios from "axios";
    import { back_api } from "$src/lib/const";
    import { invalidateAll } from "$app/navigation";

    // 일정 추가 VALUE
    let date = $state(moment().format("yyyy-MM-dd"));
    let startTime = $state("00:00");
    let endTime = $state("00:00");
    let ordererName = $state("");

    // 일자별 오더 리스트
    let orderDayList = $state([]);

    // 일정 추가 element Boolean
    let addSchedule = $state(true);

    // let monthEvent = $state([]);
    let options = $state({
        dateClick: function (info) {
            date = moment(info.date).format("YYYY-MM-DD");
            getOrderList(date);
            schedule_modal.showModal();
        },
        eventClick: function (info) {
            date = moment(info.event.start).format("YYYY-MM-DD");
            getOrderList(date);
            schedule_modal.showModal();
        },
        events: [],
        initialView: "dayGridMonth",
        plugins: [daygridPlugin, interactionPlugin],
        locale: "ko",
        datesSet: async function (info) {
            const startDate = moment(info.startStr).utc().format("YYYY-MM-DD");
            const endDate = moment(info.endStr).utc().format("YYYY-MM-DD");
            try {
                const res = await axios.post(
                    `${back_api}/admin/load_schedule`,
                    {
                        startDate,
                        endDate,
                    },
                );

                if (res.status == 200) {
                    const scheduleListTemp = res.data.scheduleList;

                    try {
                        const res = await axios.post(
                            `${back_api}/admin/load_schedule`,
                            {
                                startDate,
                                endDate,
                            },
                        );

                        if (res.status == 200) {
                            const scheduleListTemp = res.data.scheduleList;
                            const monthEvent = scheduleListTemp.map((item) => {
                                return {
                                    title: `${item.start_time.slice(0, 5)}~${item.end_time.slice(0, 5)} ${item.orderer_name}님`,
                                    date: moment(item.date).format(
                                        "YYYY-MM-DD",
                                    ), // Moment.js로 날짜 변환
                                };
                            });

                            options = {
                                ...options,
                                events: monthEvent,
                                eventContent: function (info) {
                                    const titleArr =
                                        info.event.title.split(" ");
                                    return {
                                        html: `<div style="text-align:center;">
                                            <div>${titleArr[0]}</div>
                                            <div>${titleArr[1]}</div>
                                        </div>`,
                                    };
                                },
                            };

                            // reSortElement()
                        }
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            } catch (error) {}

            // console.log("뷰 변경 또는 날짜 범위 업데이트");
            // console.log("현재 뷰:", info.view.type); // 예: "dayGridMonth"
            // console.log("시작 날짜:", info.startStr); // 현재 뷰의 시작 날짜
            // console.log("끝 날짜:", info.endStr); // 현재 뷰의 끝 날짜
        },
    });

    $effect(() => {});

    async function updateReserve() {
        try {
            const res = await axios.post(`${back_api}/admin/add_schedule`, {
                date,
                start_time: startTime,
                end_time: endTime,
                orderer_name: ordererName,
            });

            if (res.status == 200) {
                alert("일정이 등록되었습니다.");
                invalidateAll();
            }
        } catch (error) {}
    }

    async function timeChange(e) {
        console.log(e.target.value);

        console.log(startTime);
        console.log(endTime);
        if (startTime != "00:00" && endTime != "00:00") {
            const timeChkBool = isStartTimeAfterEndTime(startTime, endTime);
            console.log(timeChkBool);
            if (!timeChkBool) {
                alert("시작시간이 종료시간보다 앞서 있습니다.");
                e.target.value = "00:00";
            }
        }
    }

    function isStartTimeAfterEndTime(startTime, endTime) {
        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const endDate = new Date(`1970-01-01T${endTime}:00`);
        return startDate < endDate;
    }

    async function getOrderList(date) {
        console.log(date);

        try {
            const res = await axios.post(
                `${back_api}/admin/get_day_order_list`,
                {
                    date,
                },
            );
            console.log(res);

            if (res.status == 200) {
                orderDayList = res.data.order_list.map((item) => {
                    console.log(item.id);

                    return {
                        id: item.id,
                        startTime: item.start_time.slice(0, 5),
                        endTime: item.end_time.slice(0, 5),
                        ordererName: item.orderer_name,
                        date: moment(item.date).format("YYYY-MM-DD"), // Moment.js로 날짜 변환
                    };
                });

                console.log(orderDayList);
            }
        } catch (error) {}
    }
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
                                bind:value={date}
                            />
                        </td>
                        <td class="in-td">
                            <select
                                id="hours"
                                class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                bind:value={startTime}
                                on:change={timeChange}
                            >
                                {#each Array(24)
                                    .fill(0)
                                    .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                    <option value={`${hour}:00`}
                                        >{hour}:00</option
                                    >
                                {/each}
                            </select>
                        </td>
                        <td class="in-td">
                            <select
                                id="hours"
                                class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                bind:value={endTime}
                                on:change={timeChange}
                            >
                                {#each Array(24)
                                    .fill(0)
                                    .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                    <option value={`${hour}:00`}
                                        >{hour}:00</option
                                    >
                                {/each}
                            </select>
                        </td>
                        <td class="in-td">
                            <input
                                type="text"
                                class="input-base text-xs"
                                placeholder="성함을 입력하세요"
                                bind:value={ordererName}
                            />
                        </td>
                    </tr>

                    {#each orderDayList as dayOrder, idx}
                        <tr>
                            <td class="in-td">
                                <input
                                    type="date"
                                    class="border w-full px-1 py-2 rounded-md text-xs"
                                    bind:value={orderDayList[idx]["date"]}
                                />
                            </td>
                            <td class="in-td">
                                <select
                                    id="hours"
                                    class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                    bind:value={orderDayList[idx]["startTime"]}
                                    on:change={timeChange}
                                >
                                    {#each Array(24)
                                        .fill(0)
                                        .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                        <option value={`${hour}:00`}
                                            >{hour}:00</option
                                        >
                                    {/each}
                                </select>
                            </td>
                            <td class="in-td">
                                <select
                                    id="hours"
                                    class="border w-full py-2 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                    bind:value={orderDayList[idx]["endTime"]}
                                    on:change={timeChange}
                                >
                                    {#each Array(24)
                                        .fill(0)
                                        .map( (_, i) => String(i).padStart(2, "0"), ) as hour}
                                        <option value={`${hour}:00`}
                                            >{hour}:00</option
                                        >
                                    {/each}
                                </select>
                            </td>
                            <td class="in-td">
                                <input
                                    type="text"
                                    class="input-base text-xs"
                                    placeholder="성함을 입력하세요"
                                    bind:value={orderDayList[idx]["ordererName"]}
                                />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="mt-3">
            <form method="dialog">
                <button
                    class="btn btn-info min-h-8 h-8 text-white"
                    type="button"
                    on:click={updateReserve}
                >
                    일정 추가
                </button>
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

<style>
    .highlight {
        background-color: red !important;
    }
    .fc-event {
        background-color: #ff5733 !important; /* 이벤트 배경 색상 변경 */
        color: #ffffff !important; /* 글자 색상 변경 */
        border: none !important; /* 테두리 제거 */
    }

    .fc-daygrid-event {
        font-size: 14px !important; /* 폰트 크기 변경 */
    }

    .fc-h-event {
        border-radius: 8px !important; /* 테두리 둥글게 */
    }
</style>
