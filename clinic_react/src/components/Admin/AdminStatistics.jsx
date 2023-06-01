import { useContext, useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { RootContext } from "../..";
import axios from "axios";
import { useErrorMessage } from "../../hook/useErrorMessage";

export const AdminStatistics = () => {
    const [data, setData] = useState([]);
    const { server } = useContext(RootContext);
    const [monthShift, setMonthShift] = useState(0);
    const [date, setDate] = useState("");
    const { setErrorPopUp, setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();


    useEffect(() => {
        const url = `${server}/api/appointments/statistics?diffMonths=${monthShift}`

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.admin}`,
            }
        })
            .then(res => {
                const data = res.data;
                setData(data)
                const date = new Date(Date.parse(data[0].Дата));
                const monthYear = date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
                setDate(monthYear.slice(0, -2))
            })
            .catch(err => {
                if (err.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                } else {
                    setErrorPopUp(true)
                }
            })
    }, [monthShift])



    return (
        <div className="container">
            <div className="big_title">
                Статистика приемов
            </div>
            <div className="title date">{date}</div>
            <div className="statistics_container">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} syncId="id">
                        <defs>
                            <linearGradient id="blueGradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="#0082d9ff" />
                                <stop offset="60%" stopColor="#2894dcaa" />
                                <stop offset="100%" stopColor="#2894dc20" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="Дата" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="Число посещений" stroke="#0082d9" fill="url(#blueGradient)" animationDuration={400} />
                    </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} syncId="id">
                        <defs>
                            <linearGradient id="greenGradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="#00a63dff" />
                                <stop offset="60%" stopColor="#00a63daa" />
                                <stop offset="100%" stopColor="#00a63d00" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="Дата" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="Доход" stroke="#00a63d" fill="url(#greenGradient)" animationDuration={400} />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="controls">
                    <button onClick={() => setMonthShift(monthShift + 1)} >{"<"}</button>
                    <button className="reset" onClick={() => setMonthShift(0)} >Текущий месяц</button>
                    <button onClick={() => setMonthShift(monthShift - 1)} >{">"}</button>
                </div>
            </div>
        </div>
    )
}