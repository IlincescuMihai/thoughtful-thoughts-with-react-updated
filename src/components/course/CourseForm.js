import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
// import SelectInput from "../common/SelectInput";

const CourseForm = ({ course, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h2>{course.id ? "Edit" : "Add"} Thoughtful thought</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="You are grateful for :"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />

      <TextInput
        name="day"
        label="Date"
        value={course.day}
        onChange={onChange}
        error={errors.day}
      />

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary"
        onClick={onSave}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CourseForm;
