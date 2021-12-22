import { useState, useEffect } from 'react';

export default function FormField(props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(props.value);
    }, []);

    const validate = (target) => {
        const value = target.value;
        let errors = [];
        if (props.isrequired && value === '') {
            errors.push('Entry is required');
        }
        if (props.minlength && value.trim().length < parseInt(props.minlength)) {
            errors.push('Min length is ' + props.minlength);
        }
        if (errors.length === 0) {
            setErrorMsg('');
        } else {
            setErrorMsg(errors.join(' ... '));
        }
        target.setAttribute('errors', errorMsg);
    };

    return (
        <div className="form-field">
            <div className="label" htmlFor={props.name}>
                {props.label}
            </div>
            <input
                className="form-field"
                type={props.type}
                id={props.name}
                name={props.name}
                value={value}
                placeholder={props.label}
                isrequired={props.isRequired}
                minLength={props.minLength}
                errors={errorMsg}
                onBlur={function (ev) {
                    validate(ev.target);
                }}
                onChange={(ev) => setValue(ev.target.value)}
                style={{ width: props.type === 'number' ? 100 : null }}
            />
            {errorMsg !== '' ? <div className="error-msg">{errorMsg}</div> : null}
        </div>
    );
}
