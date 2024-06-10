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
            <div class="text-6xl  flex items-center justify-center font-bold py-9  bg-green-700 text-white">
                คิวที่เรียกไปแล้ว
            </div>
            <div class="overflow-hidden flex justify-center pb-10 pt-[rem]">
                <div v-if="completedQueues.length <= 10" class="" vertical :clone="true">
                    <div class="grid grid-cols-2 gap-2 flex-grow">
                        <div class="bg-black text-yellow-500 text-7xl font-extrabold w-full p-4 !px-16 flex-grow flex items-center justify-center"
                            v-for="(queue, index) in completedQueues" :key="index">
                            {{ queue }}
                        </div>
                    </div>
                </div>
                <Vue3Marquee v-else class="" vertical :clone="true">
                    <div class="grid grid-cols-2 gap-2 flex-grow">
                        <div class="bg-black text-yellow-500 text-7xl font-extrabold w-full p-4 px-10 flex-grow flex items-center justify-center"
                            v-for="(queue, index) in completedQueues" :key="index">
                            {{ queue }}
                        </div>
                    </div>
                </Vue3Marquee>
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
const completedQueues = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8','Q9', 'Q10', 'Q11', 'Q12' ];


</script>

<style>
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