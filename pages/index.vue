<style>
.glow {
    color: #84cc16;
    /* สีเขียว lime-600 ใน Tailwind */

}
</style>
<template>
    <div class="mx-auto flex h-screen pb-16">
        <!-- Column 1: Drug Counters -->
        <div class="bg-gray-100  w-2/12 flex flex-col">
            <div class="text-8xl flex items-center justify-center font-extrabold h-[8rem] bg-yellow-500">ช่อง
            </div>
            <div class="mb-2 bg-black glow text-9xl font-extrabold flex-grow flex items-center justify-center"
                v-for="counter in drugCounters" :key="counter">
                {{ counter }}
            </div>
        </div>

        <!-- Column 2: Upcoming Queues -->
        <div class="bg-gray-100 w-7/12 mx-2 flex flex-col">
            <div class="text-8xl flex items-center justify-center font-extrabold h-[8rem]  bg-rose-500 text-white">
                คิวรับยา</div>
            <div class="grid grid-cols-4 gap-2 flex-grow">
                <div class="bg-blue-800 text-white text-8xl font-extrabold flex-grow flex items-center justify-center"
                    v-for="queue in upcomingQueues" :key="queue">
                    {{ queue }}
                </div>
            </div>
        </div>

        <!-- Column 3: Completed Queues -->
        <div class="bg-gray-100 w-3/12 flex flex-col">
            <div class="text-6xl flex items-center justify-center font-bold h-[8rem] bg-green-700 text-white">
                คิวที่เรียกไปแล้ว
            </div>
            <div class="overflow-hidden flex-grow relative">
                <div class="grid grid-cols-2 gap-2 flex-grow"
                    :class="{ 'animate-scroll-up': completedQueues.length > maxVisibleItems }"
                    :style="{ height: scrollHeight }">
                    <div class="bg-black text-yellow-500 text-7xl font-extrabold p-2 flex-grow flex items-center justify-center"
                        v-for="(queue, index) in displayQueues" :key="index">
                        {{ queue }}
                    </div>
                </div>
            </div>


        </div>
    </div>

    <div class="fixed bottom-0 w-full bg-black overflow-hidden">
        <!-- <div class="barrage text-white text-4xl font-bold pt-4">
            อักษรวิ่งจากขวาไปซ้าย วนลูป
        </div> -->
        <div id="rssBlock">
            <p class="cnnContents">
                <span
                    class="marqueeStyle text-white text-8xl font-bold pt-2">&nbsp;กรุณานำบัตรประชาชนมาติดต่อทุกครั้ง!</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { $mqtt } from "vue-paho-mqtt";
const mqttSub = async () => {
    try {
        $mqtt.subscribe(`chainathospital_drag/1`, (message) => {
            // เมื่อมีการรับข้อมูลจาก mqtt
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage)
        });
    } catch (error) {
        console.error(error);
    }
};
const drugCounters = ['7', '8', '9', '10',];
const upcomingQueues = ['198', '199', '100', '101', '198', '199', '100', '101', '198', '99', '100', '101', '198', '199', '100', '101'];
// const completedQueues = ['111', '111', '111', '111', '111', '111', '111', '111', '111', '111', '111', '111'];

const completedQueues = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // Example data
const maxVisibleItems = 10;
const itemHeight = 8; // Height of each item in 'rem'
const rows = Math.ceil(completedQueues.value.length / 2);

const displayQueues = computed(() => {
    if (completedQueues.value.length > maxVisibleItems) {
        return [...completedQueues.value, ...completedQueues.value];
    }
    return completedQueues.value;
});

const scrollHeight = computed(() => `${rows * itemHeight}rem`);

</script>

<style>
#rssBlock {
    left: 0;
    /* height: 80px; */
    background: #000000;
    position: fixed;
    width: 100%;
    overflow: hidden;
    bottom: 0;
}

.cnnContents {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    font-size: 30px;
    color: white;
}

.marqueeStyle {
    display: inline-block;
    padding-left: 100%;
    animation: scrolling-left 20s linear infinite;
}

.overflow-hidden {
    overflow: hidden;
}

/* scroll up */
:root {
    --marquee-width: 20vw;
    --marquee-height: 80vh;
    --marquee-elements-displayed: 5;
    --marquee-element-height: calc(var(--marquee-height) / var(--marquee-elements-displayed));
    --marquee-animation-duration: calc(var(--marquee-elements) * 3s);
}

.marquee {
    width: var(--marquee-width);
    height: var(--marquee-height);
    background-color: #111;
    color: #eee;
    overflow: hidden;
    position: relative;
}

.marquee:before,
.marquee:after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 10rem;
    content: "";
    z-index: 1;
}

.marquee:before {
    top: 0;
    background: linear-gradient(to bottom, #111 0%, transparent 100%);
}

.marquee:after {
    bottom: 0;
    background: linear-gradient(to top, #111 0%, transparent 100%);
}

.marquee-content {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    animation: scrolling var(--marquee-animation-duration) linear infinite;
}

@keyframes scrolling {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(calc(-1 * var(--marquee-element-height) * var(--marquee-elements)));
    }
}

.marquee-content li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: var(--marquee-element-height);
    font-size: calc(var(--marquee-width)*3/4);
    white-space: nowrap;
}

.marquee-content li img {
    width: 100%;
    border: 2px solid #eee;
}

@media (max-width: 600px) {
    html {
        font-size: 12px;
    }

    :root {
        --marquee-width: 100vw;
        --marquee-height: 60vh;
        --marquee-elements-displayed: 3;
    }

    .marquee:before,
    .marquee:after {
        height: 5rem;
    }
}

/* .animate-scroll-up {
    animation: scroll-up 7s linear infinite;
}

@keyframes scroll-up {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
} */

@keyframes scrolling-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

/* คุณสามารถเพิ่มสไตล์เพิ่มเติมที่นี่ */
.barrage {
    white-space: nowrap;
    animation: barrage 30s linear infinite;
}

@keyframes barrage {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai');

@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


.mdi {
    font-size: 13px;
    padding: 0;
}


body {
    margin: 0px !important;
    padding: 0px !important;
    /* font-weight: 300; */
    font-weight: 400;
    /* default 400 */
    font-family: "Kanit", sans-serif;
    /* font-family: "Noto Sans Thai", sans-serif; */
}

* {
    font-family: "Kanit", sans-serif;
    /* font-family: "Noto Sans Thai", sans-serif; */
}
</style>