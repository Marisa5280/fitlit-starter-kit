import { expect } from 'chai';
import sampleActivity from '../src/data/sample-activity';
import sampleUsers from '../src/data/sample-users';
import { milesWalkedOnDate, dailyActiveMinutes, getWeeklyStepGoals } from '../src/activityFunctions';


describe('milesWalkedOnDate', () => {
  const userID = 1;
  const date = '2023/03/24';
  const activityData = sampleActivity.sampleActivityData;
  const usersData = sampleUsers.sampleUsers;
  it('should calculate total miles walked on a date by a user', () => {
    expect(milesWalkedOnDate(userID, date, usersData, activityData)).to.equal(5.6)
  })

  it('should return 0 if user does not exist', () => {
    expect(milesWalkedOnDate(51, date, usersData, activityData)).to.equal(0)
     })
  // it('should return 0 if date does not exist', () => {
  //   expect(milesWalkedOnDate(userID, '2023/03/32', usersData, activityData)).to.equal(0)
  // })
})


describe('dailyActiveMinutes', () => {
  const userID = 1;
  const date = '2023/03/24';
  const activityData = sampleActivity.sampleActivityData;
  
  it('should get the users active minutes', () => {
    expect(dailyActiveMinutes(userID, date, activityData)).to.equal(261)
  })
  it('should return 0 if user does not exist', () => {
    expect(dailyActiveMinutes(51, date, activityData)).to.equal(0)
  })
  it('should return 0 if date does not exist', () => {
    expect(dailyActiveMinutes(userID, '2023/03/32', activityData)).to.equal(0)
  })
})


describe('getWeeklyStepGoals', () => {
  const activityData = sampleActivity.sampleActivityData;
  const user = sampleUsers.sampleUsers[0]
  it('should determine if a user has met their step goal for the days of the last week', () => {
    expect(getWeeklyStepGoals(user, activityData)).to.deep.equal([
      '2023/03/24: pass',
      '2023/03/25: pass',
      '2023/03/26: pass',
      '2023/03/27: fail',
      '2023/03/28: pass',
      '2023/03/29: pass'
    ])
  })
  it('should return [] if we don\'t have step data', () => {
    expect(getWeeklyStepGoals(51, activityData)).to.deep.equal([])
  })
})