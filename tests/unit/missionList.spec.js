import { shallowMount, mount } from "@vue/test-utils";
import MissionList from "@/components/MissionList.vue";

describe("MissionList.vue test", () => {
  it("props data test", () => {
    // test one
    const wrapper = shallowMount(MissionList, {
      propsData: {
        missions: [
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
    expect(wrapper.findAll(".mission-list-content").at(1).text()).toEqual(
      "third mission".toUpperCase()
    );

    // test two
    wrapper.setProps({
      missions: [
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
    });

    expect(wrapper.findAll(".mission-list-content").length).toEqual(3);
    expect(wrapper.findAll(".mission-list-content").at(2).text()).toEqual(
      "forth mission".toUpperCase()
    );
  });

  it("watch props: data sortedMissionList test", () => {
    const wrapper = shallowMount(MissionList, {
      propsData: {
        missions: [
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
        missions: [
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

    wrapper.vm.executeMission(2);
    expect(wrapper.emitted().executeMissionEmit).toBeTruthy();
    expect(wrapper.emitted().executeMissionEmit.length).toEqual(1);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.missions[0]).toEqual({
      complete: false,
      name: "third mission",
      unitTime: 1500,
      executeTime: 0,
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
        name: "forth mission",
        unitTime: 1500,
        executeTime: 0,
      },
    ]);
  });
});
