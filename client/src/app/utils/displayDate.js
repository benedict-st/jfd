import moment from "moment";
export function displayDate(data) {
    const date = new Date(data);
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDate() - date.getDate();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();

                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }

        return date.toLocaleString("default", {
            month: "long",
            day: "numeric"
        });
    }
    return (
        date.getFullYear() + "." + (date.getMonth() + 1) + "_" + date.getDate()
    );
}
export function orderDiffData(data) {
    const dateEnd = moment(data).format("YYYY-MM-DD");
    const dateStart = moment(new Date()).format("YYYY-MM-DD");
    const a = moment(dateEnd);
    const b = moment(dateStart);
    const dayDiff = a.diff(b, "days");
    if (dayDiff < 0) {
        return `Вы не успели забрать заказ.`;
    }
    if (dayDiff == 0) {
        return `Ваш заказ готов. Заберите сегодня `;
    }
    if (dayDiff == 1) {
        return `Ваш заказ будет готов через ${dayDiff} день`;
    }
    if (dayDiff == 2 || dayDiff == 3 || dayDiff == 4) {
        return `Ваш заказ будет готов через ${dayDiff} дня`;
    }
    if (dayDiff == 5) {
        return `Ваш заказ будет готов через ${dayDiff} дней`;
    }
    return "Ваш заказ будет готов еще не скоро";
}

export function titleDateOrder(data) {
    return `Дата заказа: ${moment(data).format("DD-MM-YYYY")}`;
}

export function checkDateOrder(data) {
    const dateEnd = moment(data).format("YYYY-MM-DD");
    const dateStart = moment(new Date()).format("YYYY-MM-DD");
    const a = moment(dateEnd);
    const b = moment(dateStart);
    const dayDiff = a.diff(b, "days");
    if (dayDiff == 0) {
        return `1. Вы не можете отменить заказ. Ваш заказ уже готов`;
    }
    if (dayDiff !== 0) {
        return `2. Очень жаль, у нас все так вкусно`;
    }
}
