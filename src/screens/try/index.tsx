import {useArray} from 'utils'

export const TsReactTest = () => {
  const persons: {name: string; age: number}[] = [
    {
      name: 'xiaoliu',
      age: 2,
    },
    {
      name: 'xiao',
      age: 3,
    },
  ]
  const {value, clear, removeIndex, add} = useArray(persons)
  return (
    <>
      <button onClick={() => add({name: 'xioaliu', age: 11})}>add</button>
      <button onClick={() => removeIndex(0)}>remove</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index) => (
        <div style={{marginBottom: '10px'}}>
          <span style={{color: '#4bb14f'}}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </>
  )
}
