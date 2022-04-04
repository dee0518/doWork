import { Wrapper, Button } from '../../Path'

function CalendarHeader(props){
    const { styleType, type, selectedDate, weekDates } = props

    return (
        <Wrapper className="calendar-header-group">
            <Button className="prev-btn" onClick={props.onClickArrowBtn}>prev</Button>
            <div>
                { (styleType === 'small' || (type === 'month' || type === undefined )) && `${selectedDate.toLocaleString('en-US',{ month: 'long' })}, ${selectedDate.getFullYear()}`}
                { (styleType !== 'small' && type === 'week') && `${selectedDate.toLocaleString('en-US',{ month: 'long' })} ${weekDates[0]} - ${weekDates[6]}, ${selectedDate.getFullYear()}`}
                { (styleType !== 'small' && type === 'day') && `${selectedDate.toLocaleString('en-US',{ month: 'long' })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
            </div>
            <Button className="next-btn" onClick={props.onClickArrowBtn}>next</Button>
        </Wrapper>
    )
}

export default CalendarHeader