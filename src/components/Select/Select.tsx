import React, {KeyboardEvent, useEffect, useState} from 'react';
import s from './Select.module.css'

type ItemType = {
    title: string
    value: any
}

type SelectPropsType = {
    value?: any
    onChange: (value: any) => void
    items: ItemType[]
}

const SelectSecret = (props: SelectPropsType) => {
    const [active, setActive] = useState(false);
    const [hoveredElementValue, setHoveredElementValue] = useState(props.value);

    const selectedItem = props.items.find(el => (el.value === props.value));
    const hoveredItem = props.items.find(el => (el.value === hoveredElementValue));

    useEffect(() => {
        setHoveredElementValue(props.value);
    }, [props.value])

    const toggleItems = () => setActive(!active)
    const onItemClick = (value: any) => {
        props.onChange(value);
        toggleItems();
    }

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].value === hoveredElementValue) {
                    const pretendentElement = e.key === 'ArrowDown'
                        ? props.items[i + 1]
                        : props.items[i - 1]

                    if (pretendentElement) {
                        props.onChange(pretendentElement.value);
                        break
                    }
                }
            }
            if (!selectedItem) {
                props.onChange(props.items[0].value);
            }

        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false)
        }

    }
    return (
        <div
            tabIndex={0}
            onKeyUp={onKeyUp}
        >
            <span className={s.title} onClick={toggleItems}>{selectedItem && selectedItem.title}</span>
            {
                active &&
                <div className={s.items}>
                    {props.items.map(el => <div
                        onMouseEnter={() => setHoveredElementValue(el.value)}
                        className={s.item + ' ' + (hoveredItem === el ? s.selected : '')}
                        id={el.value}
                        onClick={() => onItemClick(el.value)}
                    >
                        {el.title}
                    </div>)}
                </div>
            }
        </div>
    );
};

export const Select = React.memo(SelectSecret);

export default Select;
