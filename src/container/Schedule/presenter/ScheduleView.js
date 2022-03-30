import { useState } from "react"
import { useParams } from "react-router"
import { Button, Calendar, SearchForm, SelectBox, Wrapper } from "../../../Path"
import ScheduleMenu from "./ScheduleMenu"

function ScheduleView(){
    const params = useParams
    const list = ['Month', 'Week','Day']
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [modalState, setModalState] = useState(false)

    const onChangeSearch = (e) => setSearchValue(e.target.value)
    const onChangeSelect = (e) => setSelectValue(e.target.value)
    const onClickAddBtn = () => setModalState(true)

    return (
        <Wrapper className="schedule-view-wrapper">
            <ScheduleMenu/>
            <Wrapper className="search-cal-group">
                <SearchForm
                    value={searchValue} 
                    onChange={onChangeSearch}
                />
                <Wrapper className="select-add-group">
                    <SelectBox list={list} value={selectValue} onChange={onChangeSelect}/>
                    <Button className={'add-btn'} onClick={onClickAddBtn}>Add</Button>
                </Wrapper>
                <Calendar type={'grid'} params={params}/>
            </Wrapper>
            
        </Wrapper>
    )
}

export default ScheduleView