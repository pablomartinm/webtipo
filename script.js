document.getElementById('zzzzSlider').addEventListener('input', function() {
    document.documentElement.style.setProperty('--pleamar-zzzz', this.value);
});

function mareaSubida(startTime, endTime, cssVarName) {
    // Convertir horas a milisegundos desde la medianoche
    const startMillis = convertTimeToMillis(startTime);
    const endMillis = convertTimeToMillis(endTime);
    const currentMillis = convertTimeToMillis(getCurrentTime());

    // Calcular la duración del ciclo y el tiempo transcurrido
    const cycleDuration = endMillis - startMillis;
    let timeElapsed = currentMillis - startMillis;

    // Ajustar si estamos fuera del ciclo
    if (timeElapsed < 0 || timeElapsed > cycleDuration) {
        timeElapsed = 0; // O cualquier otra lógica para manejar fuera de horas
    }

    // Calcular la fase del ciclo (0 a 1)
    const cyclePhase = timeElapsed / cycleDuration;

    // Asumiendo que el rango de ZZZZ es de 100 a 600
    const minZZZZ = 100;
    const maxZZZZ = 600;
    const zzzzValue = minZZZZ + (maxZZZZ - minZZZZ) * cyclePhase;

    // Aplicar el valor de ZZZZ al elemento h3
    document.documentElement.style.setProperty(cssVarName, zzzzValue);
}

function mareaBajada(startTime, endTime, cssVarName) {
    // Convertir horas a milisegundos desde la medianoche
    const startMillis = convertTimeToMillis(startTime);
    const endMillis = convertTimeToMillis(endTime);
    const currentMillis = convertTimeToMillis(getCurrentTime());

    // Calcular la duración del ciclo y el tiempo transcurrido
    const cycleDuration = endMillis - startMillis;
    let timeElapsed = currentMillis - startMillis;

    // Ajustar si estamos fuera del ciclo
    if (timeElapsed < 0 || timeElapsed > cycleDuration) {
        timeElapsed = 0; // O cualquier otra lógica para manejar fuera de horas
    }

    // Calcular la fase del ciclo (0 a 1)
    const cyclePhase = timeElapsed / cycleDuration;

    // Asumiendo que el rango de ZZZZ es de 100 a 600
    const minZZZZ = 100;
    const maxZZZZ = 600;
    const zzzzValue = maxZZZZ - (maxZZZZ - minZZZZ) * cyclePhase;

    // Aplicar el valor de ZZZZ al elemento h3
    document.documentElement.style.setProperty(cssVarName, zzzzValue);
}

function convertTimeToMillis(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 3600000 + minutes * 60000;
}

function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}

function getCurrentTimeCanarias() {
    const now = new Date();
    now.setHours(now.getHours() - 1); // Resta una hora

    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}

function updateCurrentTimes() {
    const currentTimeDisplays = document.getElementsByClassName('current-time');
    for (let i = 0; i < currentTimeDisplays.length; i++) {
        currentTimeDisplays[i].textContent = getCurrentTime();
    }
}

function updateCurrentTimeCanarias() {
    const currentTimeDisplay = document.getElementById('current-time-canarias');
    if (currentTimeDisplay) {
        currentTimeDisplay.textContent = getCurrentTimeCanarias();
    }
}

function updateIndicatorsVerde(startTime, endTime, htmlVarName) {
    const indicators = document.getElementById(htmlVarName); // Suponiendo que es un único elemento
    const now = new Date();
    const currentHoursMinutes = now.getHours().toString().padStart(2, '0') + ':' +
                                now.getMinutes().toString().padStart(2, '0');
    
    if (currentHoursMinutes >= startTime && currentHoursMinutes < endTime) {
        // Dentro del rango de horas para verde y ▲
        indicators.style.color = 'green';
        indicators.textContent = '▲';
    }
}

function updateIndicatorsRojo(startTime, endTime, htmlVarName) {
    const indicators = document.getElementById(htmlVarName); // Suponiendo que es un único elemento
    const now = new Date();
    const currentHoursMinutes = now.getHours().toString().padStart(2, '0') + ':' +
                                now.getMinutes().toString().padStart(2, '0');
    
    if (currentHoursMinutes >= startTime && currentHoursMinutes < endTime) {
        // Dentro del rango de horas para rojo y ▼
        indicators.style.color = 'red';
        indicators.textContent = '▼';
    }
}

function scheduleMareaBajada(startTime, endTime, cssVarName) {
    const startMillis = convertTimeToMillis(startTime) - convertTimeToMillis(getCurrentTime());
    const endMillis = convertTimeToMillis(endTime) - convertTimeToMillis(getCurrentTime());

    // Establecer un temporizador para iniciar mareaBajada
    setTimeout(() => {
        const intervalId = setInterval(() => {
            mareaBajada(startTime, endTime, cssVarName);
        }, 1000); // Actualización cada minuto

        // Establecer un temporizador para detener mareaBajada
        setTimeout(() => clearInterval(intervalId), endMillis);
    }, startMillis);
}

function scheduleMareaSubida(startTime, endTime, cssVarName) {
    const startMillis = convertTimeToMillis(startTime) - convertTimeToMillis(getCurrentTime());
    const endMillis = convertTimeToMillis(endTime) - convertTimeToMillis(getCurrentTime());

    // Establecer un temporizador para iniciar mareaBajada
    setTimeout(() => {
        const intervalId = setInterval(() => {
            mareaSubida(startTime, endTime, cssVarName);
        }, 1000); // Actualización cada minuto

        // Establecer un temporizador para detener mareaBajada
        setTimeout(() => clearInterval(intervalId), endMillis);
    }, startMillis);
}

function scheduleIndicatorsRojo(startTime, endTime, cssVarName) {
    const startMillis = convertTimeToMillis(startTime) - convertTimeToMillis(getCurrentTime());
    const endMillis = convertTimeToMillis(endTime) - convertTimeToMillis(getCurrentTime());

    // Establecer un temporizador para iniciar mareaBajada
    setTimeout(() => {
        const intervalId = setInterval(() => {
            updateIndicatorsRojo(startTime, endTime, cssVarName);
        }, 1000); // Actualización cada minuto

        // Establecer un temporizador para detener mareaBajada
        setTimeout(() => clearInterval(intervalId), endMillis);
    }, startMillis);
}

function scheduleIndicatorsVerde(startTime, endTime, cssVarName) {
    const startMillis = convertTimeToMillis(startTime) - convertTimeToMillis(getCurrentTime());
    const endMillis = convertTimeToMillis(endTime) - convertTimeToMillis(getCurrentTime());

    // Establecer un temporizador para iniciar mareaBajada
    setTimeout(() => {
        const intervalId = setInterval(() => {
            updateIndicatorsVerde(startTime, endTime, cssVarName);
        }, 1000); // Actualización cada minuto

        // Establecer un temporizador para detener mareaBajada
        setTimeout(() => clearInterval(intervalId), endMillis);
    }, startMillis);
}

updateCurrentTimes()

setInterval(() => updateCurrentTimes(), 1000);

updateCurrentTimeCanarias()

setInterval(() => updateCurrentTimeCanarias(), 1000);

// Las catedrales

scheduleIndicatorsVerde('02:17','08:34','flecha-playa-1');
scheduleIndicatorsRojo('08:34','14:42','flecha-playa-1');
scheduleIndicatorsVerde('14:42','20:52','flecha-playa-1');

scheduleMareaSubida('02:17','08:34', '--pleamar-zzzz-h3-playa-1');
scheduleMareaBajada('08:34', '14:42', '--pleamar-zzzz-h3-playa-1');
scheduleMareaSubida('14:42','20:52', '--pleamar-zzzz-h3-playa-1');

//************************************** */ Las catedrales

scheduleIndicatorsVerde('02:17','08:34','flecha-playa-2');
scheduleIndicatorsRojo('08:34','14:42','flecha-playa-2');
scheduleIndicatorsVerde('14:42','20:52','flecha-playa-2');

scheduleMareaSubida('02:17','08:34', '--pleamar-zzzz-h3-playa-2');
scheduleMareaBajada('08:34', '14:42', '--pleamar-zzzz-h3-playa-2');
scheduleMareaSubida('14:42','20:52', '--pleamar-zzzz-h3-playa-2');

// Bolonia

scheduleIndicatorsVerde('00:30','06:06','flecha-playa-3');
scheduleIndicatorsRojo('06:06','12:46','flecha-playa-3');
scheduleIndicatorsVerde('12:46','18:38','flecha-playa-3');
scheduleIndicatorsRojo('18:38','23:59','flecha-playa-3');

scheduleMareaSubida('00:30','06:06', '--pleamar-zzzz-h3-playa-3');
scheduleMareaBajada('06:06','12:46', '--pleamar-zzzz-h3-playa-3');
scheduleMareaSubida('12:46','18:38', '--pleamar-zzzz-h3-playa-3');
scheduleMareaBajada('18:38','23:59', '--pleamar-zzzz-h3-playa-3');

// Papagayo

scheduleIndicatorsVerde('05:09','11:16','flecha-playa-4');
scheduleIndicatorsRojo('11:16','17:27','flecha-playa-4');
scheduleIndicatorsVerde('17:27','23:39','flecha-playa-4');

scheduleMareaSubida('05:09','11:16', '--pleamar-zzzz-h3-playa-4');
scheduleMareaBajada('11:16','17:27', '--pleamar-zzzz-h3-playa-4');
scheduleMareaSubida('17:27','23:39', '--pleamar-zzzz-h3-playa-4');



