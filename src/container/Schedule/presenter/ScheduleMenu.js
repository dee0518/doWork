import { useNavigate, useParams } from 'react-router'
import { SubMenuBox, SubMenuTitle, Calendar } from '../../../Path'

function ScheduleMenu(){
    const navigator = useNavigate()
    const params = useParams()
    const titles = ['calendar','schedule']

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

    return (
        <SubMenuBox>
            <SubMenuTitle type={'button'} titles={titles} curTitle={params.sub} onClickSubTitle={onClickSubTitle}/>
            <Calendar type={'small'} params={params}/>
        </SubMenuBox>
    )
}

export default ScheduleMenu