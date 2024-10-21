import { View, Text } from 'react-native'
import React from 'react'

export default function Dots({
    steps,
    step
}: {
    steps: number,
    step: number
}) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 4 }}>
            {Array.from({ length: steps }).map((_, index) => (
                <View
                    key={index}
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: step === index ? '#2A74EC' : '#C4C4C4',
                        margin: 2
                    }}
                />
            ))}
        </View>
    )
}