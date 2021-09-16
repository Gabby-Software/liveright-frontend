import React, { FormEventHandler, useEffect, useRef, useState } from 'react'

import { ReactComponent as TimesIcon } from '../../../../../assets/media/icons/cross.svg'
import { ReactComponent as MicIcon } from '../../../../../assets/media/icons/microphone-filled.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import RecorderManager from '../../../../../modules/chat/managers/recorder.manager'
import { secondsString } from '../../../../../modules/chat/pipes/seconds-string.pipe'
import ChatActionsSend from '../chat-actions-send/chat-actions-send.component'
import Styles from './chat-actions-recording.styles'

const recorder = new RecorderManager()

export default function ChatActionsRecording() {
  const { setMode, sendAudio } = useChatRoom()
  const [timeOver, setTimeOver] = useState(0)
  const startTime = useRef(new Date().getTime())

  useEffect(() => {
    recorder.startRecord()

    const interval = setInterval(() => {
      setTimeOver(Math.round((new Date().getTime() - startTime.current) / 1000))
    }, 1000)

    return () => {
      clearInterval(interval)
      recorder.destroy()
    }
  }, [])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    recorder.stopRecord((file) => {
      sendAudio(file)
      setMode(ChatRoomModes.DEFAULT)
    })
  }

  const stopRecording = () => {
    recorder.stopRecord(() => setMode(ChatRoomModes.DEFAULT))
  }

  return (
    <Styles onSubmit={handleSubmit}>
      <div className={'chat-rec__indicator'}>
        <MicIcon className={'chat-rec__mic'} />
        <div className={'chat-rec__time'}>{secondsString(timeOver)}</div>

        <div className={'chat-rec__cancel'} onClick={stopRecording}>
          <TimesIcon />
          <span>Cancel Record</span>
        </div>
      </div>

      <ChatActionsSend />
    </Styles>
  )
}
