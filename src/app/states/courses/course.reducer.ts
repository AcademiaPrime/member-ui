import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Course} from '@model/course.interface';
import {createFeature, createReducer, on} from '@ngrx/store';
import * as CourseActions from './course.action';
import {loadCoursesSuccessfully} from './course.action';

export interface State extends  EntityState<Course> {
    // additional entities state properties
    selectedCourseId: number | null;
}

export function selectCourseId(course: Course) {
    // in this case this would be optional since primary key is id
    return course.id;
}

export function sortByName(a: Course, b: Course): number {
    return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
    selectId: selectCourseId,
    sortComparer: sortByName
});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedCourseId: null
});

export const courseReducer = createReducer(
    initialState,
    on(CourseActions.selecteCourse, (state, {courseId}) => {
        return { ...state, selectedCourseId: courseId };
    }),
    on(CourseActions.addCourse, (state, { course }) => {
        return adapter.addOne(course, state);
    }),
    on(CourseActions.setCourse, (state, { course }) => {
        return adapter.setOne(course, state);
    }),
    on(CourseActions.upsertCourse, (state, { course }) => {
        return adapter.upsertOne(course, state);
    }),
    on(CourseActions.addCourses, (state, { courses }) => {
        return adapter.addMany(courses, state);
    }),
    on(CourseActions.upsertCourses, (state, { courses }) => {
        return adapter.upsertMany(courses, state);
    }),
    on(CourseActions.updateCourse, (state, { update }) => {
        return adapter.updateOne(update, state);
    }),
    on(CourseActions.updateCourses, (state, { updates }) => {
        return adapter.updateMany(updates, state);
    }),
    on(CourseActions.mapCourse, (state, { entityMap }) => {
        return adapter.mapOne(entityMap, state);
    }),
    on(CourseActions.mapCourses, (state, { entityMap }) => {
        return adapter.map(entityMap, state);
    }),
    on(CourseActions.deleteCourse, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),
    on(CourseActions.deleteCourses, (state, { ids }) => {
        return adapter.removeMany(ids, state);
    }),
    on(CourseActions.deleteCoursesByPredicate, (state, { predicate }) => {
        return adapter.removeMany(predicate, state);
    }),
    on(CourseActions.loadCoursesSuccessfully, (state, { courses }) => {
        return adapter.setAll(courses, state);
    }),
    on(CourseActions.setCourses, (state, { courses }) => {
        return adapter.setMany(courses, state);
    }),
    on(CourseActions.clearCourses, state => {
        return adapter.removeAll({ ...state, selectedUserId: null });
    })
);

export const getSelectedCourseId = (state: State) => state.selectedCourseId;

// get the selectors
const {
    selectIds,
    selectEntities,
    selectTotal,
    selectAll
} = adapter.getSelectors();

// select the array of course ids
export const selectCourseIds = selectIds;

// select the dictionary of course entities
export const selectCourseEntities = selectEntities;

// select the array of courses
export const selectAllCourses = selectAll;

// select the total course count
export const selectCourseTotal = selectTotal;

export const coursesFeature = createFeature({
    name: 'courses',
    reducer: courseReducer
})
