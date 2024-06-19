export const handleDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    let formattedDuration = '';

    if (hours < 10) {
        formattedDuration += '0' + hours;
    } else {
        formattedDuration += hours;
    }

    formattedDuration += ':';

    if (minutes < 10) {
        formattedDuration += '0' + minutes;
    } else {
        formattedDuration += minutes;
    }

    if (hours === 1) {
        formattedDuration += ' hour';
    } else {
        formattedDuration += ' hours';
    }

    return formattedDuration;
}