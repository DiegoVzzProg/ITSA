<template>
    <label class="cyber-checkbox">
        <input type="checkbox" :disabled="props.disabled" :checked="props.checked" />
        <span class="cyber-checkbox__mark">
            <div class="cyber-checkbox__box">
                <svg class="cyber-checkbox__check" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </div>
            <div class="cyber-checkbox__effects">
                <div class="cyber-checkbox__spark"></div>
                <div class="cyber-checkbox__spark"></div>
                <div class="cyber-checkbox__spark"></div>
                <div class="cyber-checkbox__spark"></div>
            </div>
            <div class="cyber-checkbox__particles">
                <div class="particle-1"></div>
                <div class="particle-2"></div>
                <div class="particle-3"></div>
                <div class="particle-4"></div>
                <div class="particle-5"></div>
                <div class="particle-6"></div>
                <div class="particle-7"></div>
                <div class="particle-8"></div>
            </div>
        </span>
    </label>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
interface Props {
    checked: boolean;
    disabled: boolean;
}

const props = defineProps<Props>()

onMounted(() => {

});


</script>

<style scoped>
.cyber-checkbox {
    --checkbox-size: 24px;
    --checkbox-color: #5c67ff;
    --checkbox-check-color: #ffffff;
    --checkbox-hover-color: #4c57ef;
    --checkbox-spark-offset: -20px;

    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
}

.cyber-checkbox input {
    display: none;
}

.cyber-checkbox__mark {
    position: relative;
    display: inline-block;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
}

.cyber-checkbox__box {
    position: absolute;
    inset: 0;
    border: 2px solid var(--checkbox-color);
    border-radius: 4px;
    background: transparent;
    transition: all 0.2s ease;
}

.cyber-checkbox__check {
    position: absolute;
    inset: 0;
    padding: 2px;
    stroke: var(--checkbox-check-color);
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    transform: scale(0);
    transition: transform 0.2s ease;
}

.cyber-checkbox__effects {
    position: absolute;
    inset: var(--checkbox-spark-offset);
    pointer-events: none;
}

.cyber-checkbox__spark {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    background: var(--checkbox-color);
    border-radius: 50%;
    opacity: 0;
    transform-origin: center center;
}

/* Hover */
.cyber-checkbox:hover .cyber-checkbox__box {
    border-color: var(--checkbox-hover-color);
    box-shadow: 0 0 0 2px rgba(92, 103, 255, 0.1);
}

/* Checked */
.cyber-checkbox input:checked+.cyber-checkbox__mark .cyber-checkbox__box {
    background: var(--checkbox-color);
    border-color: var(--checkbox-color);
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .cyber-checkbox__check {
    transform: scale(1);
}

/* Spark Animation */
.cyber-checkbox input:checked+.cyber-checkbox__mark .cyber-checkbox__spark {
    animation: spark 0.4s ease-out;
}

.cyber-checkbox__spark:nth-child(1) {
    transform: rotate(0deg) translateX(var(--checkbox-spark-offset));
}

.cyber-checkbox__spark:nth-child(2) {
    transform: rotate(90deg) translateX(var(--checkbox-spark-offset));
}

.cyber-checkbox__spark:nth-child(3) {
    transform: rotate(180deg) translateX(var(--checkbox-spark-offset));
}

.cyber-checkbox__spark:nth-child(4) {
    transform: rotate(270deg) translateX(var(--checkbox-spark-offset));
}

@keyframes spark {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg) translateX(var(--checkbox-spark-offset));
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: scale(1) rotate(0deg) translateX(calc(var(--checkbox-spark-offset) * 1.5));
    }
}

/* Active */
.cyber-checkbox:active .cyber-checkbox__box {
    transform: scale(0.9);
}

/* Focus */
.cyber-checkbox input:focus+.cyber-checkbox__mark .cyber-checkbox__box {
    box-shadow: 0 0 0 4px rgba(92, 103, 255, 0.2);
}

.cyber-checkbox__particles {
    position: absolute;
    inset: -50%;
    pointer-events: none;
}

.cyber-checkbox__particles div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--checkbox-color);
    opacity: 0;
}

/* Particle animations for check */
.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-1 {
    animation: particle-1 0.4s ease-out forwards;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-2 {
    animation: particle-2 0.4s ease-out forwards 0.1s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-3 {
    animation: particle-3 0.4s ease-out forwards 0.15s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-4 {
    animation: particle-4 0.4s ease-out forwards 0.05s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-5 {
    animation: particle-5 0.4s ease-out forwards 0.12s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-6 {
    animation: particle-6 0.4s ease-out forwards 0.08s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-7 {
    animation: particle-7 0.4s ease-out forwards 0.18s;
}

.cyber-checkbox input:checked+.cyber-checkbox__mark .particle-8 {
    animation: particle-8 0.4s ease-out forwards 0.15s;
}

/* Particle animations for uncheck */
.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-1 {
    animation: particle-out-1 0.4s ease-out forwards;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-2 {
    animation: particle-out-2 0.4s ease-out forwards 0.1s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-3 {
    animation: particle-out-3 0.4s ease-out forwards 0.15s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-4 {
    animation: particle-out-4 0.4s ease-out forwards 0.05s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-5 {
    animation: particle-out-5 0.4s ease-out forwards 0.12s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-6 {
    animation: particle-out-6 0.4s ease-out forwards 0.08s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-7 {
    animation: particle-out-7 0.4s ease-out forwards 0.18s;
}

.cyber-checkbox input:not(:checked)+.cyber-checkbox__mark .particle-8 {
    animation: particle-out-8 0.4s ease-out forwards 0.15s;
}

/* Particle keyframes for check */
@keyframes particle-1 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(-20px, -20px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-2 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(20px, -20px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-3 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(20px, 20px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-4 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(-20px, 20px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-5 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(-30px, 0px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-6 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(30px, 0px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-7 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0px, -30px) scale(1);
        opacity: 0;
    }
}

@keyframes particle-8 {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0px, 30px) scale(1);
        opacity: 0;
    }
}

/* Particle keyframes for uncheck */
@keyframes particle-out-1 {
    0% {
        transform: translate(-20px, -20px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-2 {
    0% {
        transform: translate(20px, -20px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-3 {
    0% {
        transform: translate(20px, 20px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-4 {
    0% {
        transform: translate(-20px, 20px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-5 {
    0% {
        transform: translate(-30px, 0px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-6 {
    0% {
        transform: translate(30px, 0px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-7 {
    0% {
        transform: translate(0px, -30px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}

@keyframes particle-out-8 {
    0% {
        transform: translate(0px, 30px) scale(1);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
}
</style>