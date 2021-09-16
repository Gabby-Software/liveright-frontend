import React, {
  CSSProperties,
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { ReactComponent as MicIcon } from '../../../../../assets/media/icons/microphon.svg'
import { ReactComponent as PauseIcon } from '../../../../../assets/media/icons/pause.svg'
import { ReactComponent as PlayIcon } from '../../../../../assets/media/icons/play.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatFileType } from '../../../../../modules/chat/types/chat-file.type'
import { classes } from '../../../../../pipes/classes.pipe'
import Styles from './chat-message-audio.styles'

type Props = {
  file: ChatFileType
  id: string
  me: boolean
}
const ChatMessageAudio: FC<Props> = ({ file, id, me }) => {
  const { playing, setPlaying, isPopup } = useChatRoom()
  const [paused, setPaused] = useState(true)
  const [progress, setProgress] = useState(0)
  const progressFlag = useRef(0) // remove unused calls
  const audioRef = useRef<HTMLAudioElement>(null)
  const Icon = useMemo(() => (paused ? PlayIcon : PauseIcon), [paused])

  useEffect(() => {
    if (!audioRef.current) return
    if (playing === id) {
      audioRef.current.play()
      setPaused(false)
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPaused(true)
    }
  }, [playing])

  const switchAudioState = useCallback(() => {
    if (playing && !paused) {
      audioRef.current?.pause()
      setPaused(true)
    } else {
      setPaused(false)
      setPlaying(id)
      audioRef.current?.play()
    }
  }, [playing, paused])

  const updateProgress = useCallback(() => {
    if (!audioRef.current) return
    if (progressFlag.current === 2) return
    if (progressFlag.current === 1) {
      progressFlag.current = 2
      return
    }
    progressFlag.current = 1
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    )

    setTimeout(() => {
      progressFlag.current--
      if (progressFlag.current) {
        progressFlag.current = 0
        updateProgress()
      }
    })
  }, [])

  const handleEnd = useCallback(() => {
    if (!audioRef.current) return
    setPlaying(null)
    setPaused(true)
    audioRef.current.currentTime = 0
  }, [])

  const handleChangeTime: MouseEventHandler = useCallback(
    (e) => {
      if (!audioRef.current) return
      console.log('CLICK', e)
      //
      const p = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth
      setProgress(p * 100)
      audioRef.current.currentTime = audioRef.current.duration * p
    },
    [paused]
  )

  // console.log(file)
  return (
    <Styles
      className={classes(
        'cm-audio',
        paused || 'cm-audio__playing',
        me && 'cm-audio__me',
        isPopup && 'cm-audio__popup'
      )}
    >
      <MicIcon className="cm-audio__microphone" />
      <div className="cm-audio__divider" />
      <Icon className="cm-audio__action" onClick={switchAudioState} />

      <div
        className="cm-audio__progress"
        style={{ '--progress': `${progress}%` } as CSSProperties}
        onClick={handleChangeTime}
      />

      <audio
        src={file.url}
        className="cm-audio__audio"
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onEnded={handleEnd}
      >
        <source src={file.url} type="audio/wav" />
        <track src={file.url} kind="captions" />
      </audio>
    </Styles>
  )
}

export default ChatMessageAudio
