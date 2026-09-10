/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-sector-carousel]').forEach((carousel) => {
        const cards = Array.from(carousel.querySelectorAll('[data-sector-card]'));
        const stage = carousel.querySelector('[data-carousel-stage]');
        const previousButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const pagination = carousel.querySelector('[data-carousel-pagination]');
        let activeIndex = 0;
        let pointerStart = null;

        const dots = cards.map((card, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'sector-dot';
            dot.setAttribute('aria-label', `Ver sector ${index + 1}: ${card.getAttribute('aria-label')}`);
            dot.addEventListener('click', () => setActive(index));
            pagination.appendChild(dot);
            return dot;
        });

        function wrappedDistance(index) {
            let distance = index - activeIndex;
            const midpoint = cards.length / 2;
            if (distance > midpoint) distance -= cards.length;
            if (distance < -midpoint) distance += cards.length;
            return distance;
        }

        function render() {
            cards.forEach((card, index) => {
                const distance = wrappedDistance(index);
                card.classList.toggle('is-active', distance === 0);
                card.classList.toggle('is-prev', distance === -1);
                card.classList.toggle('is-next', distance === 1);
                card.setAttribute('aria-hidden', distance === 0 ? 'false' : 'true');
                card.tabIndex = Math.abs(distance) <= 1 ? 0 : -1;
            });

            dots.forEach((dot, index) => {
                const selected = index === activeIndex;
                dot.classList.toggle('is-active', selected);
                dot.setAttribute('aria-current', selected ? 'true' : 'false');
            });
        }

        function setActive(index, focusCard = false) {
            activeIndex = (index + cards.length) % cards.length;
            render();
            if (focusCard) cards[activeIndex].focus({ preventScroll: true });
        }

        function move(direction) {
            setActive(activeIndex + direction);
        }

        previousButton.addEventListener('click', () => move(-1));
        nextButton.addEventListener('click', () => move(1));

        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== activeIndex) setActive(index, true);
            });
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActive(index, true);
                }
            });
        });

        carousel.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                move(-1);
            }
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                move(1);
            }
        });

        stage.addEventListener('pointerdown', (event) => {
            pointerStart = event.clientX;
        });
        stage.addEventListener('pointerup', (event) => {
            if (pointerStart === null) return;
            const delta = event.clientX - pointerStart;
            pointerStart = null;
            if (Math.abs(delta) > 55) move(delta > 0 ? -1 : 1);
        });
        stage.addEventListener('pointercancel', () => {
            pointerStart = null;
        });

        render();
    });

    document.querySelectorAll('[data-clarity-experience]').forEach((experience) => {
        const tabs = Array.from(experience.querySelectorAll('[data-clarity-tab]'));
        const panels = Array.from(experience.querySelectorAll('[data-clarity-panel]'));

        function activateClarityTab(name, moveFocus = false) {
            tabs.forEach((tab) => {
                const selected = tab.dataset.clarityTab === name;
                tab.classList.toggle('is-active', selected);
                tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                tab.tabIndex = selected ? 0 : -1;
                if (selected && moveFocus) tab.focus({ preventScroll: true });
            });

            panels.forEach((panel) => {
                const selected = panel.dataset.clarityPanel === name;
                panel.hidden = !selected;
                panel.classList.toggle('is-active', selected);
            });
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => activateClarityTab(tab.dataset.clarityTab));
            tab.addEventListener('keydown', (event) => {
                let nextIndex = null;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = tabs.length - 1;
                if (nextIndex === null) return;
                event.preventDefault();
                activateClarityTab(tabs[nextIndex].dataset.clarityTab, true);
            });
        });

        const visibilityDemo = experience.querySelector('[data-visibility-demo]');
        if (visibilityDemo) {
            const periodButtons = Array.from(visibilityDemo.querySelectorAll('[data-visibility-period]'));
            const bars = Array.from(visibilityDemo.querySelectorAll('.visibility-bars span'));
            const visibilityData = {
                7: {
                    investment: 'Q840',
                    results: '146',
                    cost: 'Q5.75',
                    reach: '18,420',
                    label: 'Últimos 7 días',
                    bars: [42, 68, 54, 79, 63, 88, 72]
                },
                30: {
                    investment: 'Q3,460',
                    results: '612',
                    cost: 'Q5.65',
                    reach: '64,880',
                    label: 'Últimos 30 días',
                    bars: [51, 44, 66, 58, 73, 61, 84]
                },
                total: {
                    investment: 'Q8,920',
                    results: '1,484',
                    cost: 'Q6.01',
                    reach: '168,400',
                    label: 'Periodo total',
                    bars: [38, 55, 47, 68, 63, 77, 91]
                }
            };

            function setVisibilityPeriod(period) {
                const values = visibilityData[period];
                if (!values) return;
                visibilityDemo.querySelector('[data-visibility-investment]').textContent = values.investment;
                visibilityDemo.querySelector('[data-visibility-results]').textContent = values.results;
                visibilityDemo.querySelector('[data-visibility-cost]').textContent = values.cost;
                visibilityDemo.querySelector('[data-visibility-reach]').textContent = values.reach;
                visibilityDemo.querySelector('[data-visibility-period-label]').textContent = values.label;
                bars.forEach((bar, index) => bar.style.setProperty('--bar-height', `${values.bars[index]}%`));
                periodButtons.forEach((button) => {
                    const selected = button.dataset.visibilityPeriod === period;
                    button.classList.toggle('is-active', selected);
                    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
                });
            }

            periodButtons.forEach((button) => {
                button.addEventListener('click', () => setVisibilityPeriod(button.dataset.visibilityPeriod));
            });
        }

        const directionDemo = experience.querySelector('[data-direction-demo]');
        if (directionDemo) {
            const directionButtons = Array.from(directionDemo.querySelectorAll('[data-direction-step]'));
            const directionData = {
                detect: {
                    icon: 'bi-activity',
                    kicker: 'SEÑAL DETECTADA',
                    title: 'El costo por resultado comienza a subir',
                    copy: 'Se revisan el anuncio, la audiencia, la frecuencia y el presupuesto antes de decidir qué modificar.',
                    delivery: 'Un hallazgo documentado con la métrica, el periodo y una posible causa.'
                },
                test: {
                    icon: 'bi-layers',
                    kicker: 'PRUEBA PROPUESTA',
                    title: 'Se define una variable para comparar',
                    copy: 'Se puede probar un nuevo anuncio, público o enfoque sin cambiar todos los elementos al mismo tiempo.',
                    delivery: 'Una prueba con objetivo definido, duración prevista y el indicador que se observará.'
                },
                adjust: {
                    icon: 'bi-sliders',
                    kicker: 'AJUSTE CONTROLADO',
                    title: 'El presupuesto se dirige con criterio',
                    copy: 'Los cambios se realizan de forma gradual y se conserva un registro para poder relacionarlos con el rendimiento.',
                    delivery: 'El cambio realizado, su fecha y la razón que respalda la decisión.'
                },
                measure: {
                    icon: 'bi-graph-up',
                    kicker: 'RESULTADO EVALUADO',
                    title: 'Se compara el efecto del cambio',
                    copy: 'Después de reunir suficientes datos, se determina si conviene mantener, ampliar o reemplazar la prueba.',
                    delivery: 'Una conclusión clara y el siguiente paso recomendado para la campaña.'
                }
            };

            function setDirectionStep(step) {
                const values = directionData[step];
                if (!values) return;
                const icon = directionDemo.querySelector('[data-direction-icon]');
                icon.className = `bi ${values.icon}`;
                directionDemo.querySelector('[data-direction-kicker]').textContent = values.kicker;
                directionDemo.querySelector('[data-direction-title]').textContent = values.title;
                directionDemo.querySelector('[data-direction-copy]').textContent = values.copy;
                directionDemo.querySelector('[data-direction-delivery]').textContent = values.delivery;
                directionButtons.forEach((button) => {
                    const selected = button.dataset.directionStep === step;
                    button.classList.toggle('is-active', selected);
                    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
                });
            }

            directionButtons.forEach((button) => {
                button.addEventListener('click', () => setDirectionStep(button.dataset.directionStep));
            });
        }

        const communicationDemo = experience.querySelector('[data-communication-demo]');
        if (communicationDemo) {
            const formatButtons = Array.from(communicationDemo.querySelectorAll('[data-communication-format]'));
            const items = Array.from(communicationDemo.querySelectorAll('[data-communication-item]'));
            const communicationData = {
                whatsapp: {
                    icon: 'bi-whatsapp',
                    kicker: 'RESUMEN DE SEGUIMIENTO',
                    title: 'Una lectura rápida por WhatsApp',
                    copy: 'Los avances principales se explican de forma breve para que conozcas el estado de las campañas.',
                    items: ['Inversión y resultados del periodo', 'Cambios relevantes detectados', 'Acciones realizadas o recomendadas'],
                    frequency: 'Frecuencia sugerida: semanal'
                },
                powerbi: {
                    icon: 'bi-bar-chart-line',
                    kicker: 'INFORME VISUAL',
                    title: 'Un panel organizado en Power BI',
                    copy: 'Las métricas se presentan mediante indicadores y gráficas que facilitan las comparaciones entre periodos.',
                    items: ['Rendimiento general y por campaña', 'Inversión, resultados y costos', 'Filtros según los datos disponibles'],
                    frequency: 'Frecuencia sugerida: mensual'
                },
                presentation: {
                    icon: 'bi-easel',
                    kicker: 'PRESENTACIÓN EXPLICATIVA',
                    title: 'Conclusiones listas para conversar',
                    copy: 'Una presentación resume lo más importante, explica los cambios y ordena las decisiones siguientes.',
                    items: ['Hallazgos principales', 'Qué se ajustó y por qué', 'Recomendaciones para el próximo periodo'],
                    frequency: 'Frecuencia sugerida: cierre de periodo'
                }
            };

            function setCommunicationFormat(format) {
                const values = communicationData[format];
                if (!values) return;
                const icon = communicationDemo.querySelector('[data-communication-icon]');
                icon.className = `bi ${values.icon}`;
                communicationDemo.querySelector('[data-communication-kicker]').textContent = values.kicker;
                communicationDemo.querySelector('[data-communication-title]').textContent = values.title;
                communicationDemo.querySelector('[data-communication-copy]').textContent = values.copy;
                communicationDemo.querySelector('[data-communication-frequency]').textContent = values.frequency;
                items.forEach((item, index) => item.textContent = values.items[index]);
                formatButtons.forEach((button) => {
                    const selected = button.dataset.communicationFormat === format;
                    button.classList.toggle('is-active', selected);
                    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
                });
            }

            formatButtons.forEach((button) => {
                button.addEventListener('click', () => setCommunicationFormat(button.dataset.communicationFormat));
            });
        }
    });

    document.querySelectorAll('[data-workflow]').forEach((workflow) => {
        const tabs = Array.from(workflow.querySelectorAll('[data-workflow-step]'));
        const panel = workflow.querySelector('#workflow-panel');
        const previousButton = workflow.querySelector('[data-workflow-prev]');
        const nextButton = workflow.querySelector('[data-workflow-next]');
        const progress = workflow.querySelector('[data-workflow-progress]');
        const items = Array.from(workflow.querySelectorAll('[data-workflow-item]'));
        const steps = {
            diagnostico: {
                icon: 'bi-search',
                kicker: 'PRIMERO ENTENDEMOS EL CONTEXTO',
                title: 'Diagnóstico del negocio y la campaña',
                copy: 'Antes de invertir, revisamos qué necesita lograr la empresa y qué información ya existe. Así evitamos comenzar con decisiones aisladas.',
                items: ['Objetivo, oferta y resultado esperado', 'Público, ubicación y canales disponibles', 'Historial de campañas y materiales existentes'],
                delivery: 'Un diagnóstico breve con prioridades claras para comenzar.',
                shortLabel: 'Diagnóstico'
            },
            planificacion: {
                icon: 'bi-diagram-3',
                kicker: 'CONVERTIMOS EL OBJETIVO EN UN PLAN',
                title: 'Estructura, presupuesto y medición',
                copy: 'Definimos cómo se organizará la campaña, cuánto se destinará a cada parte y cuáles indicadores permitirán evaluar el avance.',
                items: ['Objetivo y estructura de campañas', 'Distribución inicial del presupuesto', 'Métricas y recorrido de conversión'],
                delivery: 'Un plan de campaña con prioridades, presupuesto y criterios de medición.',
                shortLabel: 'Planificación'
            },
            lanzamiento: {
                icon: 'bi-megaphone',
                kicker: 'PREPARAMOS Y COMPROBAMOS LA EJECUCIÓN',
                title: 'Configuración y lanzamiento controlado',
                copy: 'La campaña se construye con sus públicos, anuncios y configuraciones. Antes de activarla, se revisa que cada elemento corresponda al plan.',
                items: ['Configuración de campañas y conjuntos', 'Anuncios, textos y destinos disponibles', 'Presupuesto, fechas y verificación final'],
                delivery: 'Una campaña configurada, revisada y lista para comenzar a recopilar datos.',
                shortLabel: 'Lanzamiento'
            },
            optimizacion: {
                icon: 'bi-sliders',
                kicker: 'OBSERVAMOS, APRENDEMOS Y AJUSTAMOS',
                title: 'Seguimiento y optimización con criterio',
                copy: 'Monitoreo el comportamiento de la inversión y realizo cambios graduales cuando los datos muestran una oportunidad de mejora.',
                items: ['Resultados, costos y ritmo de inversión', 'Audiencias, ubicaciones y anuncios', 'Pruebas realizadas y efecto de los cambios'],
                delivery: 'Un registro comprensible de ajustes, razones y aprendizajes del periodo.',
                shortLabel: 'Optimización'
            },
            informe: {
                icon: 'bi-clipboard-data',
                kicker: 'CERRAMOS EL CICLO CON UNA EXPLICACIÓN',
                title: 'Informe, conclusiones y próximos pasos',
                copy: 'Los resultados se ordenan para explicar qué ocurrió, qué aprendimos y qué conviene mantener, ajustar o probar en el siguiente periodo.',
                items: ['Resultados e inversión del periodo', 'Comparaciones y hallazgos relevantes', 'Recomendaciones y próximas prioridades'],
                delivery: 'Un informe claro acompañado por conclusiones y un siguiente plan de acción.',
                shortLabel: 'Informe y próximos pasos'
            }
        };
        const order = tabs.map((tab) => tab.dataset.workflowStep);
        let activeIndex = 0;

        function activateWorkflowStep(key, moveFocus = false) {
            const values = steps[key];
            const index = order.indexOf(key);
            if (!values || index < 0) return;
            activeIndex = index;

            tabs.forEach((tab) => {
                const selected = tab.dataset.workflowStep === key;
                tab.classList.toggle('is-active', selected);
                tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                tab.tabIndex = selected ? 0 : -1;
                if (selected && moveFocus) tab.focus({ preventScroll: true });
            });

            panel.setAttribute('aria-labelledby', tabs[index].id);
            panel.querySelector('[data-workflow-icon]').className = `bi ${values.icon}`;
            panel.querySelector('[data-workflow-kicker]').textContent = values.kicker;
            panel.querySelector('[data-workflow-title]').textContent = values.title;
            panel.querySelector('[data-workflow-copy]').textContent = values.copy;
            panel.querySelector('[data-workflow-delivery]').textContent = values.delivery;
            panel.querySelector('[data-workflow-short-label]').textContent = values.shortLabel;
            panel.querySelector('[data-workflow-counter]').textContent = `ETAPA ${String(index + 1).padStart(2, '0')} DE ${String(order.length).padStart(2, '0')}`;
            items.forEach((item, itemIndex) => item.textContent = values.items[itemIndex]);

            progress.style.setProperty('--workflow-progress', `${((index + 1) / order.length) * 100}%`);
            progress.setAttribute('aria-valuenow', String(index + 1));
            previousButton.disabled = index === 0;
            nextButton.disabled = index === order.length - 1;

            panel.classList.remove('is-switching');
            void panel.offsetWidth;
            panel.classList.add('is-switching');
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => activateWorkflowStep(tab.dataset.workflowStep));
            tab.addEventListener('keydown', (event) => {
                let nextIndex = null;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = Math.min(index + 1, tabs.length - 1);
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = Math.max(index - 1, 0);
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = tabs.length - 1;
                if (nextIndex === null || nextIndex === index) return;
                event.preventDefault();
                activateWorkflowStep(order[nextIndex], true);
            });
        });

        previousButton.addEventListener('click', () => {
            if (activeIndex > 0) activateWorkflowStep(order[activeIndex - 1]);
        });
        nextButton.addEventListener('click', () => {
            if (activeIndex < order.length - 1) activateWorkflowStep(order[activeIndex + 1]);
        });

        activateWorkflowStep(order[0]);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'adsarmScrollTarget';

    function cleanAddress() {
        let cleanPath = window.location.pathname;

        if (cleanPath.endsWith('/index.html')) {
            cleanPath = cleanPath.replace(/index\.html$/, '');
        }

        window.history.replaceState(
            null,
            '',
            cleanPath + window.location.search
        );
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (!section) return false;

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        cleanAddress();
        return true;
    }

    document.querySelectorAll('a[href*="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            const [page, sectionId] = href.split('#');

            if (!sectionId) return;

            event.preventDefault();

            if (scrollToSection(sectionId)) return;

            sessionStorage.setItem(storageKey, sectionId);
            window.location.href = page || './';
        });
    });

    const savedSection = sessionStorage.getItem(storageKey);

    if (savedSection) {
        sessionStorage.removeItem(storageKey);

        setTimeout(() => {
            scrollToSection(savedSection);
        }, 100);
    }

    if (window.location.hash) {
        const initialSection = window.location.hash.substring(1);

        setTimeout(() => {
            scrollToSection(initialSection);
        }, 100);
    } else {
        cleanAddress();
    }
});
