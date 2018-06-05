import React, {Component} from 'react';

import {Alert} from 'reactstrap';

import {Map, YMaps} from 'react-yandex-maps';

// По умолчанию центр в Москве
const mapState = {center: [55.76, 37.64], zoom: 10};

class MapContainer extends Component {
    constructor() {
        super();
        this.ymaps = '';
        this.map = '';
        this.route = false;
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {

        // Если маршрут уже построен, удаляем старый, чтобы точки не дублировалисб
        if (this.route) { this.map.geoObjects.remove(this.route); }

        if (nextProps.points && nextProps.points.length >= 2) {
            this.ymaps.route(nextProps.points, {mapStateAutoApply: true}).then((route) => {

                // Разрешаем перетаскивать точки
                route.editor.start({editWayPoints: true});

                // Устанавливаем в balloon текст, который указал пользователь
                route.getWayPoints().each((item, index) => {
                    item.properties.set('balloonContent', this.props.points[index]);
                });

                // Когда заканчивается перетаскивание элемента - определяем имя новой точки и перестраиваем маргрут
                route.events.add('dragend', (e) => {
                    const coords = e.get('target').geometry.getCoordinates();

                    this.ymaps.geocode(coords).then((res) => {
                        e.get('target').properties.set('balloonContent', res.geoObjects.get(0).properties.get('text'));

                        const points = [];
                        route.getWayPoints().each((el) => points.push(el.properties.get('balloonContent')));
                        this.props.reorderPoints(points);
                    });
                });

                // добавляем маршрут на карту
                this.route = route;
                this.map.geoObjects.add(route);
            });
        }

        return true;
    }

    onApiAvaliable(ymaps) { this.ymaps = ymaps; }

    render() {
        return [
            <div key='alert'>
                {this.props.points && this.props.points.length < 2 &&
                <Alert color='info'>Для построения маршрута необходимо минимум 2 точки.</Alert>
                }
            </div>,
            <YMaps onApiAvaliable={(ymaps) => this.onApiAvaliable(ymaps)} key='map'>
                <Map state={mapState} instanceRef={(ref) => this.map = ref} width="100%" height='400px'></Map>
            </YMaps>
        ];
    }
}

export default MapContainer;
