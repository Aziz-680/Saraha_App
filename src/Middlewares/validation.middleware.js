const reqKeys = ['body', 'query', 'params', 'headers']

const valdidation = (schema) => {
    return (req, res, next) => {

        for (const key in schema) {
            console.log({ key, reqSchema: schema[key] });
        }

    }
}

export default valdidation