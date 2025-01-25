import { memo } from 'react';
import CardHeader from './data-cards-compoent/CardHeader';

const DataCards = () => {

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <CardHeader />
        </div>
    )
}

export default memo(DataCards)
