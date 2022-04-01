import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { SubMenuBox, SubMenuTitle, Calendar } from '../../../Path'
import Status from './Status'

const data = [{
    id: 1,
    label: 'all',
    checked: true,
    color: 'purple'
},{
    id: 2,
    label: 'to do',
    checked: true,
    color: 'pink'
},{
    id: 3,
    label: 'private',
    checked: true,
    color: 'yellow'
},{
    id: 4,
    label: 'meeting',
    checked: true,
    color: 'skyblue'
},{
    id: 5,
    label: 'complete',
    checked: true,
    color: 'green'
}]

function ScheduleMenu(){
    const navigator = useNavigate()
    const params = useParams()
    const titles = ['calendar','schedule']
    const [checkList,setCheckList] = useState(data)

    const onClickSubTitle = (title) => {
        let url = createUrl(title)

        navigator(url)
    }

    const createUrl = (title = params.sub) => {
        let url = ''
        if(Object.keys(params).length === 0){
            let today = new Date()
            url = `${title}/month/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
        } else {
            url = `${title}/${params.type}/${params.year}/${params.month}/${params.date}`
        }

        return url
    }

    const onChange = (e) => {
        let id = Number(e.target.id.split('_')[1])

        let curChk = checkList[id - 1].checked
        let restChk = checkList.filter((v,i) => i !== 0 && i != id - 1 && v.checked === true).length

        setCheckList(checkList.map((check) => {
            if(id === 1){
                return {...check, checked: !checkList[0].checked}
            } else if(check.id === id){
                return {...check, checked: !check.checked}
            }

            if(check.id === 1){
                if(curChk){
                    return {...check, checked: false}
                } else if(restChk === 3) {
                    return {...check, checked: true}
                }
            }
            
            return check
        }))
    }

    return (
        <SubMenuBox>
            <SubMenuTitle type={'button'} titles={titles} curTitle={params.sub} onClickSubTitle={onClickSubTitle}/>
            <Calendar styleType={'small'} params={params} scheduleList={[]}/>
            <Status checkList={checkList} name={'status'} onChange={onChange}/>
        </SubMenuBox>
    )
}

export default ScheduleMenu