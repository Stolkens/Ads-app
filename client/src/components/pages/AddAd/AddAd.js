import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

function AddAd() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup.string().required(),
    location: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),
    image: yup.mixed().required(),
    terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
  });
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        title: '',
        location: '',
        price: '',
        description: '',
        image: null,
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='my-5'>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={values.title}
                name="title"
                placeholder="title"
                onChange={handleChange}
                isValid={touched.title && !errors.title}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={values.location}
                name="location"
                placeholder="location"
                onChange={handleChange}
                isValid={touched.location && !errors.location}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={values.price}
                name="price"
                placeholder="price"
                onChange={handleChange}
                isValid={touched.price && !errors.price}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group
              as={Col}
              md="12"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ height: '150px' }}
                as="textarea"
                type="text"
                value={values.description}
                name="description"
                placeholder="description"
                onChange={handleChange}
                isValid={touched.description && !errors.description}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              required
              name="image"
              onChange={handleChange}
              isInvalid={!!errors.image}
              style={{ width: '300px' }}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik106"
              feedbackTooltip
            />
          </Form.Group>
          <Button type="submit">Add advertisment</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddAd;