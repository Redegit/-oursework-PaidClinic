import Slider from "./Slider/Slider";
import main from './Main.module.css'
import Description from "./Description/Description";
import AdvantagesBox from "./AdvantagesBox/AdvantagesBox";
import { Technologies } from "./Technologies/Technologies";


const Main = () => {

    return (
        <main className={main.main}>
            <Slider />
            <Description />
            <AdvantagesBox />
            <Technologies />
        </main>
    )
}

export { Main };