import AOS from "aos";
import 'aos/dist/aos.css'

export function aosInit() {
    AOS.init({ 
    duration: 800, 
    easing: "ease-in-out-quad", 
    once: false, 
    offset: 0 
    });
}