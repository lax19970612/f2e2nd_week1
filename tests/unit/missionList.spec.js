import { shallowMount, mount } from "@vue/test-utils";
import MissionList from "@/components/MissionList.vue";

describe("MissionList.vue test", () => {
  it("props data test", async () => {
    // test one
    const wrapper = shallowMount(MissionList, {
      propsData: {
        missionList: [
          {
            complete: true,
            name: "first mission",
            unitTime: 1500,
            executeTime: 3000,
          },
          {
            complete: false,
            name: "second mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "third mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "forth mission",
            unitTime: 1500,
            executeTime: 0,
          },
        ],
        showComplete: false,
        limit: 2,
      },
    });

    expect(wrapper.findAll(".mission-list-content").length).toEqual(2);
    expect(wrapper.findAll(".mission-list-content")[1].text()).toEqual(
      "third mission"
    );

    // test two
    wrapper.setProps({
      missionList: [
        {
          complete: true,
          name: "first mission",
          unitTime: 1500,
          executeTime: 3000,
        },
        {
          complete: false,
          name: "second mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          complete: true,
          name: "third mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          complete: true,
          name: "forth mission",
          unitTime: 1500,
          executeTime: 0,
        },
      ],
      showComplete: true,
      limit: -1,
      showFirstMission: true,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".mission-list-content").length).toEqual(3);
    expect(wrapper.findAll(".mission-list-content")[2].text()).toEqual(
      "forth mission"
    );
  });

  it("watch props: data sortedMissionList test", () => {
    const wrapper = shallowMount(MissionList, {
      propsData: {
        missionList: [
          {
            complete: true,
            name: "first mission",
            unitTime: 1500,
            executeTime: 3000,
          },
          {
            complete: false,
            name: "second mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "third mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "forth mission",
            unitTime: 1500,
            executeTime: 0,
          },
        ],
        showComplete: false,
        limit: 2,
      },
    });

    expect(wrapper.vm.sortedMissionList).toEqual([
      {
        complete: false,
        name: "second mission",
        unitTime: 1500,
        executeTime: 0,
      },
      {
        complete: false,
        name: "third mission",
        unitTime: 1500,
        executeTime: 0,
      },
    ]);
  });

  it("executeMission method test", async () => {
    const wrapper = mount(MissionList, {
      propsData: {
        missionList: [
          {
            complete: true,
            name: "first mission",
            unitTime: 1500,
            executeTime: 3000,
          },
          {
            complete: false,
            name: "second mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "third mission",
            unitTime: 1500,
            executeTime: 0,
          },
          {
            complete: false,
            name: "forth mission",
            unitTime: 1500,
            executeTime: 0,
          },
        ],
        showComplete: false,
        limit: 2,
        showFirstMission: false,
      },
    });

    wrapper.vm.executeMission(2);

    expect(wrapper.emitted().executeMissionEmit).toBeTruthy();
    expect(wrapper.emitted().executeMissionEmit.length).toEqual(1);
  });
});
