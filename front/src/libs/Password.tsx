import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'

type Props = {
}

// 以下のように戻り値をVFC<Props>きじゅつもできるが非推奨
export const Password:FC<Props> = () => {
  const [value, setValue] = useState<string>('')  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        alert('Enterキー' + value);
      }  
    }, [value])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
    <label>パスワード</label>
    <input 
      type="password" 
      value={value} 
      onChange={(e)=>handleChange(e)}
    />
     <button 
       style={{ marginLeft: '10px'}}
       onClick={()=> alert('Enterキー' + value)}
    >
       パスワード
    </button>
    </>
  )}