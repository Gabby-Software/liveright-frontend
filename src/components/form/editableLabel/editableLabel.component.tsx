import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { CheckIcon } from '../../../assets/media/icons'
import Button from '../../buttons/button/button.component'
import Input from '../input/input.component'
import Styles from './editableLable.styles'

interface IProps {
  label: string
  onSave: (value: string) => void
  renderValue?: ReactNode
  renderCheckBtn?: boolean
}

const EditableLabel = ({
  label,
  onSave,
  renderValue,
  renderCheckBtn = false
}: IProps) => {
  const [edit, setEdit] = useState(false)
  const [inputValue, setInputValue] = useState(label)
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus()
    }
  }, [edit])

  const onSaveHandler = () => {
    setEdit(false)
    onSave(inputValue)
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(inputValue)
      setEdit(false)
    } else if (e.key === 'Escape') {
      setInputValue(label)
      setEdit(false)
    }
  }

  const editContent = (
    <>
      <Input
        className="editable-input"
        id="editable-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={onSaveHandler}
        onKeyDown={onKeyPress}
        ref={inputRef}
      />
      {renderCheckBtn && (
        <Button className="checkBtn" onClick={onSaveHandler}>
          <CheckIcon />
        </Button>
      )}
    </>
  )

  const labelContent = (
    <div onClick={() => setEdit(true)}>
      {renderValue ? renderValue : <span>{label}</span>}
    </div>
  )

  return <Styles>{edit ? editContent : labelContent}</Styles>
}

export default EditableLabel
