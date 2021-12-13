import React from 'react'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'

import { useGetValueQuery } from '../services/exchangeApi'
import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text } = Typography
const { Panel } = Collapse

const Predictions = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;
    const { data: exchangeValue } = useGetValueQuery();
    const value = exchangeValue?.conversion_rate;

    if (isFetching) return <Loader />
    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Future Price</Col>
                <Col span={6}>Should Invest</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.id}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>Rs {millify(exchange.volume * value)}</Col>
                                        {Math.floor(Math.random() * 2) === 0 ?
                                        <><Col span={6}>Up</Col>
                                        <Col span={6}>✅</Col></>:
                                        <><Col span={6}>Down</Col>
                                        <Col span={6}>❌</Col></>}
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Predictions
