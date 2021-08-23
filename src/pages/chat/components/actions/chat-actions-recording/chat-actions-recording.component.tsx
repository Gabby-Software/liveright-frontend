import React, { FC, FormEventHandler, useEffect, useRef, useState } from 'react'

import { ReactComponent as TimesIcon } from '../../../../../assets/media/icons/cross.svg'
import { ReactComponent as MicIcon } from '../../../../../assets/media/icons/microphon.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import RecorderManager from '../../../../../modules/chat/managers/recorder.manager'
import { secondsString } from '../../../../../modules/chat/pipes/seconds-string.pipe'
import ChatActionsSend from '../chat-actions-send/chat-actions-send.component'
import Styles from './chat-actions-recording.styles'

type Props = {}
const ChatActionsRecording: FC<Props> = ({}) => {
  const { setMode, sendAudio } = useChatRoom()
  const [timeOver, setTimeOver] = useState(0)
  const recorder = useRef<RecorderManager>(new RecorderManager())
  const startTime = useRef(new Date().getTime())
  useEffect(() => {
    recorder.current.startRecord(false, true, RecorderManager.audioMime())
    const interval = setInterval(() => {
      setTimeOver(Math.round((new Date().getTime() - startTime.current) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setMode(ChatRoomModes.DEFAULT)
    recorder.current
      .stopRecord()
      ?.then((blob) =>
        sendAudio(
          new File([blob as Blob], `audio_${new Date().getTime()}.webm`)
        )
      )
  }
  const stopRecording = () => {
    recorder.current.stopRecord()?.then(() => setMode(ChatRoomModes.DEFAULT))
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

export default ChatActionsRecording
