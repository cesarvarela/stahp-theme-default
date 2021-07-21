import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Grommet, Box, Stack, Meter, Button, Text } from 'grommet'

const theme = {
    "global": {
        "colors": {
            "background": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        },
        "font": {
            "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
        }
    },
    "button": {
        "extend": [
            null
        ]
    }
}

const SmallButton = styled(Button)`
    font-size: 12px;
`

const { stahpblocker } = window

export default function Long() {

    const [total, setTotal] = useState(100)
    const [left, setLeft] = useState(100);

    useEffect(() => {

        let interval

        const start = async () => {

            const total = await stahpblocker.getLongBreakTargetTime();
            setTotal(total)

            interval = setInterval(async () => {

                const time = total - await stahpblocker.getLongBreakTime();
                setLeft(time);

            }, 1000);
        }

        start()

        return () => {
            clearInterval(interval)
        }
    }, [])


    return (
        <Grommet full theme={theme}>
            <Box overflow="auto" align="center" direction="column" justify="center" flex="grow">
                <Box align="stretch" justify="center" direction="column" flex="grow">
                    <Stack anchor="center" fill guidingChild="last">
                        <Box align="center" justify="center" direction="column">
                            <Text size="xlarge" weight="bold">
                                It's time for a long break! 🙏
                            </Text>
                            <Text margin="xsmall" size="small">
                                Time left: {left} seconds
                            </Text>
                        </Box>
                        <Box align="center" justify="center" pad="medium">
                            <Meter size="large" type="circle" round thickness="medium" value={(left * 100) / total} max={100} />
                        </Box>
                    </Stack>
                </Box>
                <Box align="center" justify="center" margin={{ "top": "xsmall" }} flex="grow">
                    <Button label="Skip this break" plain size="small" onClick={() => stahpblocker.skipBreak()} />
                    <Box align="center" justify="center" margin={{ "top": "xsmall" }}>
                        <SmallButton label="Only close this window" plain size="small" onClick={() => stahpblocker.close()} />
                    </Box>
                </Box>
            </Box>
        </Grommet>
    )
}