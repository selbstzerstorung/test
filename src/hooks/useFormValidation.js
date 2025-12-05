import { useState, useCallback } from 'react';
import {
    isValidEmail,
    isValidPhone,
    isStrongPassword,
    isValidAmount
} from '../utils/validators';

export const useFormValidation = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    const validateField = useCallback((name, value, rules = {}) => {
        const newErrors = { ...errors };

        if (rules.required && (!value || value.trim() === '')) {
            newErrors[name] = rules.requiredMessage || 'This field is required';
            return newErrors;
        }

        if (value && rules.type === 'email' && !isValidEmail(value)) {
            newErrors[name] = 'Please enter a valid email address';
            return newErrors;
        }

        if (value && rules.type === 'tel' && !isValidPhone(value)) {
            newErrors[name] = 'Please enter a valid phone number';
            return newErrors;
        }

        if (value && rules.type === 'password') {
            const passwordStrength = isStrongPassword(value);
            if (!passwordStrength.isValid) {
                newErrors[name] = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
                return newErrors;
            }
        }

        if (value && rules.type === 'number') {
            const min = rules.min || 0;
            const max = rules.max || Number.MAX_SAFE_INTEGER;

            if (!isValidAmount(value, min, max)) {
                newErrors[name] = rules.amountMessage || `Amount must be between ${min} and ${max}`;
                return newErrors;
            }
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            newErrors[name] = `Minimum length is ${rules.minLength} characters`;
            return newErrors;
        }

        if (value && rules.maxLength && value.length > rules.maxLength) {
            newErrors[name] = `Maximum length is ${rules.maxLength} characters`;
            return newErrors;
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
            newErrors[name] = rules.patternMessage || 'Invalid format';
            return newErrors;
        }

        // Clear error if validation passes
        delete newErrors[name];
        return newErrors;
    }, [errors]);

    const validateForm = useCallback((validationRules = {}) => {
        const newErrors = {};

        Object.keys(validationRules).forEach(fieldName => {
            const fieldValue = values[fieldName];
            const fieldRules = validationRules[fieldName];
            const fieldError = validateField(fieldName, fieldValue, fieldRules)[fieldName];

            if (fieldError) {
                newErrors[fieldName] = fieldError;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [values, validateField]);

    const resetForm = useCallback(() => {
        setValues(initialState);
        setErrors({});
        setTouched({});
    }, [initialState]);

    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateField,
        validateForm,
        resetForm,
        setValues,
        setErrors,
        setTouched,
        setFieldValue,
        setFieldError,
        isValid: Object.keys(errors).length === 0
    };
};
