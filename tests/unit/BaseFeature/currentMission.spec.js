import { shallowMount } from "@vue/test-utils";
import CurrentMission from "@/components/BaseFeature/CurrentMission.vue";

describe('components/BaseFeature/CurrentMission.vue', () => {
  it('computed: unit', () => {
    const wrapper = shallowMount(CurrentMission, {
      propsData: {
        mission: {
          id: 1,
          complete: false,
          name: 'current mission test',
          unitTime: 1500,
          executeTime: 3000
        }
      }
    })

    expect(wrapper.vm.unit).toEqual(2)
    expect(wrapper.findAll('.timelength-showing-circle').length).toEqual(2)
  })

  it('computed: remainTime', () => {
    const wrapper = shallowMount(CurrentMission, {
      propsData: {
        mission: {
          id: 1,
          complete: false,
          name: 'current mission test',
          unitTime: 1500,
          executeTime: 3000
        }
      }
    })

    expect(wrapper.vm.remainTime).toEqual('25:00')
    expect(wrapper.find('.current-mission-countdown-timer').text()).toEqual('25:00')
  })
})