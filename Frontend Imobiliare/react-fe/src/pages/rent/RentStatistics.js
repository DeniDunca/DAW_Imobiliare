import {useEffect, useRef, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "chart.js/auto";

export const RentStatistics = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const { id } = useParams();
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(
                `http://127.0.0.1:5000/appointments/getAll/${id}/true`
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json();
            console.log(responseData);
            setAppointments(responseData);
        };

        fetchAppointments().catch((err) => {
            console.log("Error loading appointments:" + err);
        });
    }, [id]);

    useEffect(() => {
        const appointmentsPerDay = appointments.reduce(
            (acc, appointment) => {
                const date = appointment.date.split("T")[0];
                if (acc[date]) {
                    acc[date] += 1;
                } else {
                    acc[date] = 1;
                }
                return acc;
            },
            {}
        );
        const chartData = {
            labels: Object.keys(appointmentsPerDay),
            datasets: [
                {
                    label: "Number of Appointments",
                    data: Object.values(appointmentsPerDay),
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        };
        const chartConfig = {
            type: "bar",
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        type: "category",
                        labels: Object.keys(appointmentsPerDay),
                    },
                },
            },
        };
        if (chartRef && chartRef.current) {
            const myChart = new Chart(chartRef.current, chartConfig);
            return () => myChart.destroy();
        }
    }, [appointments]);

    const goToImobil = () => {
        navigate(`/rentDetails/${id}`);
    };

    return (
        <div>
            <button className={"button-programare"} onClick={goToImobil}>
                Înapoi
            </button>
            <canvas ref={chartRef} />
        </div>
    );
};
