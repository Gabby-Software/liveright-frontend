import 'react-h5-audio-player/lib/styles.css'

import React, { useEffect, useState } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'

import { PauseIcon, PlayIcon } from '../../../../../assets/media/icons'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatFileType } from '../../../../../modules/chat/types/chat-file.type'
import Styles from './chat-message-audio.styles'

interface ChatMessageAudioProps {
  file: ChatFileType
  id: string
  me: boolean
}

export default function ChatMessageAudio({
  file,
  me,
  id
}: ChatMessageAudioProps) {
  const { playing, setPlaying } = useChatRoom()
  const [ref, setRef] = useState<any>(null)

  useEffect(() => {
    if (playing !== id) {
      ref?.pause()
    }
  }, [id, playing])

  const handlePlay = () => {
    setPlaying(id)
  }

  const onRef = (node: any) => {
    if (!ref && node) {
      setRef(node?.audio?.current)
    }
  }

  return (
    <Styles $me={me}>
      <AudioPlayer
        ref={onRef}
        src={file.url}
        showJumpControls={false}
        showSkipControls={false}
        showDownloadProgress={false}
        layout="horizontal"
        customProgressBarSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        customIcons={{
          play: <PlayIcon onClick={handlePlay} />,
          pause: <PauseIcon className="chat-audio__pause" />
        }}
      />
    </Styles>
  )
}
