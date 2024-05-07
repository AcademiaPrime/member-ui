import {createAction, props} from '@ngrx/store';
import {Update, EntityMap, EntityMapOne, Predicate} from '@ngrx/entity';
import {Course} from '@model/course.interface';

const actionToken = '[Course/API]';

export const loadCourses = createAction(`${actionToken} Load Courses`);
export const loadCoursesSuccessfully = createAction(`${actionToken} Load Courses Successfully`, props<{ courses: Course[] }>());
export const setCourses = createAction(`${actionToken} Set Courses`, props<{ courses: Course[] }>());
export const addCourse = createAction(`${actionToken} Add Course`, props<{ course: Course }>());
export const setCourse = createAction(`${actionToken} Set Course`, props<{ course: Course }>());
export const upsertCourse = createAction(`${actionToken} Upsert Course`, props<{ course: Course }>());
export const addCourses = createAction(`${actionToken} Add Courses`, props<{ courses: Course[] }>());
export const upsertCourses = createAction(`${actionToken} Upsert Courses`, props<{ courses: Course[] }>());
export const updateCourse = createAction(`${actionToken} Update Course`, props<{ update: Update<Course> }>());
export const updateCourses = createAction(`${actionToken} Update Courses`, props<{ updates: Update<Course>[] }>());
export const mapCourse = createAction(`${actionToken} Map Course`, props<{ entityMap: EntityMapOne<Course> }>());
export const mapCourses = createAction(`${actionToken} Map Courses`, props<{ entityMap: EntityMap<Course> }>());
export const deleteCourse = createAction(`${actionToken} Delete Course`, props<{ id: string }>());
export const deleteCourses = createAction(`${actionToken} Delete Courses`, props<{ ids: string[] }>());
export const deleteCoursesByPredicate = createAction(`${actionToken} Delete Courses By Predicate`, props<{ predicate: Predicate<Course> }>());
export const clearCourses = createAction(`${actionToken} Clear Courses`);

export const selecteCourse = createAction(`${actionToken} Select Course`, props<{courseId: number}>());
